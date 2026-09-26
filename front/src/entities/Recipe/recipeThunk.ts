import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Recipe } from "./types.ts";
import axiosApi from "../../shared/axios/AxiosApi.ts";

export const fetchRecipes = createAsyncThunk<Recipe[]>(
  'recipes/fetchRecipes',
  async () => {
    const response = await axiosApi.get<Recipe[]>('/recipes');

    return response.data;
  }
);

export const fetchRecipe = createAsyncThunk<Recipe, string>(
  'recipes/fetchRecipe',
  async (id) => {
    const response = await axiosApi.get<Recipe>(`/recipes/${id}`);

    return response.data;
  }
);

export const fetchUserRecipes = createAsyncThunk<Recipe[], string>(
  'recipes/fetchUserRecipes',
  async (userId) => {
    const response = await axiosApi.get<Recipe[]>(`/recipes?author=${userId}`);

    return response.data;
  }
);

export const createRecipe = createAsyncThunk<Recipe, {
  title: string;
  recipe: string;
  image: File;
}>(
  'recipes/createRecipe',
  async ({title, recipe, image}) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('recipe', recipe);
    formData.append('image', image);

    const response = await axiosApi.post<Recipe>('/recipes', formData);

    return response.data;
  }
);

export const deleteRecipe = createAsyncThunk<string, string>(
  'recipes/deleteRecipe',
  async (id) => {
    await axiosApi.delete(`/recipes/${id}`);

    return id;
  }
);