import React, { useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Context as BlogContext } from "../context/BlogContext";
import { Entypo } from "@expo/vector-icons";

const ShowScreen = (props) => {
  const { state } = useContext(BlogContext); // Returns Context,Provider | See value prop of createDataContext

  const blogPost = state.find(
    (blogPost) => blogPost.id === props.navigation.getParam("blogID")
  );
  return (
    <View>
      <Text> Blog ID : {blogPost.id}</Text>
      <Text style={style.textStyle}>
        {"\n\n"}Title : {blogPost.title} {"\n\n"}
        Content : {blogPost.content}
      </Text>
    </View>
  );
};

ShowScreen.navigationOptions = (props) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate("Edit", {
            blogID: props.navigation.getParam("blogID"),
          })
        }
      >
        <Entypo
          name="edit"
          size={24}
          color="black"
          style={{ marginHorizontal: 15 }}
        />
      </TouchableOpacity>
    ),
  };
};
const style = StyleSheet.create({
  textStyle: {
    fontSize: 20,
    marginLeft: 20,
  },
});

export default ShowScreen;
