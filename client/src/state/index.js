import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    // setFriends: (state, action) => {
    //   if (state.user) {
    //     state.user.friends = action.payload.friends;
    //   } else {
    //     console.error("user friends non-existent :(");
    //   }
    // },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setBlogs: (state, action) => {
      state.blogs = action.payload.blogs.map((blog) => ({
        ...blog,
        title: blog.title, // Add the title property to the blog object
      }));
    },
    setBlog: (state, action) => {
      const updatedBlogs = state.blogs.map((blog) => {
        if (blog._id === action.payload.blog._id) {
          return {
            ...action.payload.blog,
            title: action.payload.blog.title, // Add the title property to the updated blog object
          };
        }
        return blog;
      });
      state.blogs = updatedBlogs;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost, setBlog, setBlogs } =
  authSlice.actions;
export default authSlice.reducer;
