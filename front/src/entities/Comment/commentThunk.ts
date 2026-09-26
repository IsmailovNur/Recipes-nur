import { createAsyncThunk, } from "@reduxjs/toolkit";
import axiosApi from "../../shared/axios/AxiosApi.ts";
import type { Comment } from "./types.ts";

export const fetchComments = createAsyncThunk<Comment[], string>(
  "comments/fetchComments",
  async (recipeId) => {
    const response = await axiosApi.get<Comment[]>(`/comments?recipeId=${recipeId}`);

    return response.data;
  }
);


export const createComment = createAsyncThunk<Comment, {
  recipeId: string;
  text: string;
}
>("comments/createComment",
  async ({recipeId, text}) => {
    const response = await axiosApi.post<Comment>("/comments", {
      recipeId,
      text
    });

    return response.data;
  }
);


export const deleteComment = createAsyncThunk<
  string,
  string
>("comments/deleteComment",
  async (id) => {
    await axiosApi.delete(`/comments/${id}`);

    return id;
  }
);