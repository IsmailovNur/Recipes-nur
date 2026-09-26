import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { fetchRecipe } from "../../entities/Recipe/recipeThunk";
import { Spinner } from "../../shared/Spinner/Spinner";
import { Box, Card, Typography } from "@mui/material";
import { getImageUrl } from "../../shared/utils";
import {
  selectRecipe,
  selectRecipeError,
  selectRecipeLoading
} from "../../entities/Recipe/recipeSlice.ts";


const RecipePage = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();

  const recipe = useAppSelector(selectRecipe);
  const loading = useAppSelector(selectRecipeLoading);
  const error = useAppSelector(selectRecipeError);

  useEffect(() => {
    if (id) {
      void dispatch(fetchRecipe(id));
    }
  }, [dispatch, id]);

  if (loading) return <Spinner isLoading />;


  if (error || !recipe) {
    return (
      <Typography color="error">
        {error || "Recipe not found!"}
      </Typography>
    );
  }

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        mb: 2,
        p:2
      }}
    >
      <Typography
        variant="h4"
        sx={{mb: 2}}
      >
        {recipe.title}
      </Typography>

      <Box
        component="img"
        src={getImageUrl(recipe.image)}
        alt={recipe.title}
        sx={{
          maxWidth: "100%",
          maxHeight: 500,
          objectFit: "contain",
          borderRadius: 2,
        }}
      />

      <Typography
        variant="body1"
        sx={{mb: 3}}
      >
        By:{" "}

        <Link
          to={`/users/${recipe.author._id}`}
        >
          {recipe.author.displayName}
        </Link>
      </Typography>

      <Typography
        sx={{
          whiteSpace: "pre-line",
        }}
      >
        {recipe.recipe}
      </Typography>

    </Card>
  );
};
export default RecipePage