import {
  Box,
  Button,
  Grid,
  Typography
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { Spinner } from "../../shared/Spinner/Spinner";
import {
  Link as RouterLink,
  useParams
} from "react-router-dom";
import {
  selectRecipeError,
  selectRecipeLoading,
  selectRecipes
} from "../../entities/Recipe/recipeSlice";
import {
  deleteRecipe,
  fetchUserRecipes
} from "../../entities/Recipe/recipeThunk";
import { RecipeCard } from "../../entities/Recipe/RecipeCard.tsx";
import { selectUser } from "../../entities/User/userSlice.ts";
import { toast } from "react-toastify";

const UserPage = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();

  const recipes = useAppSelector(selectRecipes);
  const loading = useAppSelector(selectRecipeLoading);
  const error = useAppSelector(selectRecipeError);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (id) {
      void dispatch(fetchUserRecipes(id));
    }
  }, [dispatch, id]);

  const deleteHandler = async (
    recipeId: string
  ) => {
    try {
      await dispatch(
        deleteRecipe(recipeId)
      ).unwrap();

      toast.success("Recipe deleted!");
    } catch (error) {
      console.log(
        "Delete recipe error",
        error
      );
    }
  };

  if (loading) {
    return <Spinner isLoading />;
  }

  if (error) {
    return (
      <Typography color="error">
        {error}
      </Typography>
    );
  }

  const displayName =
    recipes[0]?.author.displayName || "User";

  const isAuthor =
    Boolean(
      user &&
      id &&
      user._id === id
    );

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5">
          {displayName}'s recipes
        </Typography>

        {isAuthor && (
          <Button
            component={RouterLink}
            to="/recipes/new"
            variant="contained"
          >
            Add new recipe
          </Button>
        )}
      </Box>

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
            <RecipeCard
              recipe={recipe}
              showDelete={isAuthor}
              onDelete={() =>
                void deleteHandler(recipe._id)
              }
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UserPage;