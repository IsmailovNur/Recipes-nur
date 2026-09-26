import { Box, Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { Spinner } from "../../shared/Spinner/Spinner";
import { useParams } from "react-router-dom";
import {
  selectRecipeError,
  selectRecipeLoading,
  selectRecipes
} from "../../entities/Recipe/recipeSlice";
import { fetchUserRecipes } from "../../entities/Recipe/recipeThunk";
import { RecipeCard } from "../../entities/Recipe/RecipeCard.tsx";

const UserPage = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const recipes = useAppSelector(selectRecipes);
  const loading = useAppSelector(selectRecipeLoading);
  const error = useAppSelector(selectRecipeError);

  useEffect(() => {
    if (id) {
      void dispatch(fetchUserRecipes(id));
    }
  }, [dispatch, id]);

  if (loading) return <Spinner isLoading />;

  if (error) {
    return (
      <Typography color="error">
        {error}
      </Typography>
    );
  }

  const displayName = recipes[0]?.author.displayName || "User";

  return (
    <Box>
      <Typography variant="h5" sx={{mb: 3}}>
        {displayName}'s recipes
      </Typography>

      <Grid container spacing={3}>
        {recipes.map((recipe) => (
          <Grid
            key={recipe._id}
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
          >
            <RecipeCard recipe={recipe} />
          </Grid>
        ))}
      </Grid>

    </Box>
  );
};
export default UserPage