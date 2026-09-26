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