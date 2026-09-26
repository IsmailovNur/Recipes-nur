import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store.ts";
import type { Comment } from "./types.ts";
import {
  createComment,
  deleteComment,
  fetchComments
} from "./commentThunk.ts";

interface CommentState {
  comments: Comment[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CommentState = {
  comments: [],
  isLoading: false,
  error: null,
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload;
      })

      .addCase(fetchComments.rejected, (state) => {
        state.isLoading = false;
        state.error = "Failed to load comments!";
      })

      .addCase(createComment.fulfilled, (state, action) => {
        state.comments.unshift(action.payload);
      })

      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          (comment) =>
            comment._id !== action.payload
        );
      });
  },
});

export const selectComments = (state: RootState) =>
  state.comment.comments;

export const selectCommentsLoading = (state: RootState) =>
  state.comment.isLoading;

export const selectCommentsError = (state: RootState) =>
  state.comment.error;

export const commentReducer = commentSlice.reducer;