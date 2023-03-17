import React, { useContext } from "react";
import { Context as BlogContext } from "../context/BlogContext";
import BlogPostForm from "../components/BlogPostForm";

const CreateScreen = (props) => {
  const { addBlogPosts } = useContext(BlogContext); // We pnly add blogs in this page so only  dereference that only

  return (
    <BlogPostForm
      onSubmit={(title, content) =>
        addBlogPosts(title, content, () => props.navigation.navigate("Index"))
      }
    />
  );
};

export default CreateScreen;
