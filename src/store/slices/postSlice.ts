import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface PostItem {
  id: string;
  like?: boolean;
  dislike?: boolean;
}

const initialState: PostItem[] = [];

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<PostItem>) => {
      // Check if the post already exists in state
      const existingPost = state.find((post) => post.id === action.payload.id);
      if (existingPost) {
        // Update the like/dislike status if the post already exists
        existingPost.like = action.payload.like;
        existingPost.dislike = action.payload.dislike;
      } else {
        // Add the new post if it doesn't already exist
        state.push(action.payload);
      }
    },
    likePost: (state: PostItem[], action: PayloadAction<string>) => {
      const postId = action.payload;
      const post = state.find((post) => post.id === postId);
      if (post) {
        post.like = true;
      } else {
        state.push({ id: postId, like: true });
      }
    },
    dislikePost: (state: PostItem[], action: PayloadAction<string>) => {
      const postId = action.payload;
      const post = state.find((post) => post.id === postId);
      if (post) {
        post.dislike = true;
      } else {
        state.push({ id: postId, dislike: true });
      }
    },
  },
});

// action
export const { addPost, likePost, dislikePost } = postSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectPostItems = (state: any) => state.post;

export default postSlice.reducer;
