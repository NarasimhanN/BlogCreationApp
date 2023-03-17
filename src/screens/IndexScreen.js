import React from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import { useContext, useEffect } from "react"; // To read values from Blog Context ( Its in root level)
import { Context } from "../context/BlogContext";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const IndexScreen = (props) => {
  const { state, deleteBlogPosts, getBlogPosts } = useContext(Context); // Using value of Context

  useEffect(() => {
    // Used to retrieve blogs once the first time when its triggered
    // To get all Blogs from JSON server
    getBlogPosts();

    const listener = props.navigation.addListener("didFocus", () => {
      getBlogPosts();
      //Listener is when ever we add a blog post, we come back to index page but the new blog is not added, hence this will make sure the new blog is also added in the index screen
    });

    return () => {
      listener.remove(); // To avoid memory leak problems
    };
  }, []);

  return (
    <View>
      <FlatList
        data={state}
        keyExtractor={(blogPost) => blogPost.title}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("Show", { blogID: item.id })
              }
            >
              <View style={style.rowStyle}>
                <Text style={style.titleStyle}>
                  {item.title} | id : {item.id}
                </Text>
                <TouchableOpacity>
                  <EvilIcons
                    name="trash"
                    style={style.iconStlye}
                    color="black"
                    onPress={() => {
                      console.log("Deleting", item.id);
                      deleteBlogPosts(item.id);
                    }}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

IndexScreen.navigationOptions = (props) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("Create");
        }}
      >
        <AntDesign
          style={{ marginRight: 20 }}
          name="pluscircle"
          size={24}
          color="black"
        />
      </TouchableOpacity>
    ),
  };
};

const style = StyleSheet.create({
  rowStyle: {
    flexDirection: "row",
    paddingVertical: 15,
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderColor: "green",
    paddingHorizontal: 20,
  },
  titleStyle: {
    fontSize: 18,
  },
  iconStlye: {
    fontSize: 40,
  },
});
export default IndexScreen;
