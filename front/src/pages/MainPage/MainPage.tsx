import { Box, Grid, Typography } from "@mui/material";
import { Spinner } from "../../shared/Spinner/Spinner.tsx";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { useEffect } from "react";
import { fetchRecipes } from "../../entities/Recipe/recipeThunk.ts";
import { RecipeCard } from "../../entities/Recipe/RecipeCard.tsx";
import {
  selectRecipeError,
  selectRecipeLoading,
  selectRecipes
} from "../../entities/Recipe/recipeSlice.ts";

export const MainPage = () => {
  const dispatch = useAppDispatch();

  const recipes = useAppSelector(selectRecipes);
  const isLoading = useAppSelector(selectRecipeLoading);
  const error = useAppSelector(selectRecipeError);
  console.log(recipes);

  useEffect(() => {
    void dispatch(fetchRecipes());
  }, [dispatch]);

  if (isLoading) return <Spinner isLoading />;

  if (error) {
    return (
      <Typography color="error">
        {error}
      </Typography>
    );
  }

  return (
    <Box>

      <Typography
        variant="h5"
        sx={{mb: 3}}
      >
        Recipes
      </Typography>

      <Grid
        container
        spacing={3}
      >
        {recipes.map((recipe) => (
          <Grid
            key={recipe._id}
            size={{
              xs: 12,
              sm: 6,
              md: 4,
            }}
          >
            <RecipeCard recipe={recipe} />
          </Grid>
        ))}
      </Grid>

    </Box>
  );
};