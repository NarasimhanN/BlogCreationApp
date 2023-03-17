import { call } from "react-native-reanimated";
import jsonServer from "../api/jsonServer";
import createDataContext from "./createDataContext";

const blogReducer = (blogPosts, action) => {
  switch (action.type) {
    // case "add_blogpost":
    //   return [
    //     ...blogPosts,
    //     {
    //       id: Math.floor(Math.random() * 99),
    //       title: action.payload.title,
    //       content: action.payload.content,
    //     },
    //   ];
    //NOT REQUIRED : as we sent it to the DB directly
    case "delete_blogpost":
      return blogPosts.filter((blogpost) => blogpost.id !== action.payload);
    case "edit_blogpost":
      return blogPosts.map((blogPost) => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
      });
    case "get_blogposts":
      return action.payload;
    default:
      return blogPosts;
  }
};

const getBlogPosts = (dispatch) => {
  return async () => {
    const response = await jsonServer.get("/blogposts");
    console.log(response.data);
    dispatch({ type: "get_blogposts", payload: response.data });
  };
};

const addBlogPosts = (dispatch) => {
  // return (title, content, callback) => {
  //   // Called when adding new blogpost
  //   dispatch({
  //     type: "add_blogpost",
  //     payload: { title: title, content: content },
  //   }); // the action property has the payload and type
  //   callback();
  // };

  //Note Dispatch not required
  return async (title, content, callback) => {
    await jsonServer.post("/blogposts", { title, content });
    if (callback) callback();
  };
};

const deleteBlogPosts = (dispatch) => {
  //We can delete from backend and in the screen(local) we can delete using dispatch or just refresh the data from backend just like addblogPost()

  // return (id) => {
  //   dispatch({ type: "delete_blogpost", payload: id });
  // };

  return async (id) => {
    await jsonServer.delete(`/blogposts/${id}`);
    dispatch({ type: "delete_blogpost", payload: id });
  };
};

const editBlogPosts = (dispatch) => {
  // return  (id, title, content, callback) => {
  //   dispatch({
  //     type: "edit_blogpost",
  //     payload: { id: id, title: title, content: content },
  //   });
  //   callback();
  // };
  return async (id, title, content, callback) => {
    await jsonServer.put(`/blogposts/${id}`, { title, content });
    dispatch({
      type: "edit_blogpost",
      payload: { id, title, content },
    });
    if (callback) callback();
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPosts, deleteBlogPosts, editBlogPosts, getBlogPosts },
  []
);
