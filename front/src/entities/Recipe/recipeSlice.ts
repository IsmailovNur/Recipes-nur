import { createSlice } from "@reduxjs/toolkit";
import type { Recipe } from './types';
import { fetchRecipe, fetchRecipes, fetchUserRecipes } from "./recipeThunk.ts";

interface RecipeState {
  recipes: Recipe[];
  recipe: Recipe | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: RecipeState = {
  recipes: [],
  recipe: null,
  isLoading: false,
  error: null,
};

const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(
        fetchRecipes.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recipes = action.payload;
      })
      .addCase(
        fetchRecipes.rejected, (state) => {
          state.isLoading = false;
          state.error = 'Failed to load recipes!';
        })

      .addCase(fetchRecipe.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRecipe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recipe = action.payload;
      })
      .addCase(fetchRecipe.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Failed to load recipe!';
      })

      .addCase(fetchUserRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recipes = action.payload;
      });
  },

  selectors: {
    selectRecipes: (state) => state.recipes,
    selectRecipe: (state) => state.recipe,
    selectRecipeLoading: (state) => state.isLoading,
    selectRecipeError: (state) => state.error,
  }
});

export const {
  selectRecipes,
  selectRecipe,
  selectRecipeLoading,
  selectRecipeError,
} = recipeSlice.selectors;

export const recipeReducer = recipeSlice.reducer;