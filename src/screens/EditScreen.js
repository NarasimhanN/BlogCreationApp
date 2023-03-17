import React, { useContext } from "react";
import { Context as BlogContext } from "../context/BlogContext";
import BlogPostForm from "../components/BlogPostForm";

const EditScreen = (props) => {
  const { state, editBlogPosts } = useContext(BlogContext);
  const requiredBlogID = props.navigation.getParam("blogID");
  const blogPost = state.find((blogPost) => blogPost.id === requiredBlogID);

  return (
    <BlogPostForm
      initialValues={{ title: blogPost.title, content: blogPost.content }}
      onSubmit={(title, content) =>
        editBlogPosts(
          requiredBlogID,
          title,
          content,
          () => props.navigation.pop() //Go to the previous page
        )
      }
    />
  );
};

export default EditScreen;
