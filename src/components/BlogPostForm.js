import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

const BlogPostForm = ({ initialValues, onSubmit }) => {
  // const [title, setTitle] = useState(props.initialValues.title);
  // const [content, setContent] = useState(props.initialValues.content);
  const [title, setTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);
  return (
    <View>
      <Text style={style.labelStyle}>Enter Title </Text>
      <TextInput
        style={style.inputStyle}
        value={title}
        onChangeText={(newtext) => setTitle(newtext)}
      />
      <Text style={style.labelStyle}>Enter Content : </Text>
      <TextInput
        style={style.inputStyle}
        value={content}
        onChangeText={(newcontent) => setContent(newcontent)}
      />
      <Button
        title="SAVE Blog Post"
        onPress={() => {
          onSubmit(title, content);
          // props.onSubmit(title, content);
          //    props.navigation.navigate("Index");
          // We add this callback so that if adding fails it doesnt simply navigate to home screen
        }}
      />
    </View>
  );
};

BlogPostForm.defaultProps = {
  initialValues: {
    title: "",
    content: "",
  },
};

const style = StyleSheet.create({
  inputStyle: {
    borderWidth: 10,
    borderColor: "grey",
    fontSize: 18,
    padding: 10,
    marginBottom: 5,
    marginHorizontal: 15,
  },
  labelStyle: {
    fontSize: 20,
    marginBottom: 10,
    marginLeft: 15,
  },
});

export default BlogPostForm;
