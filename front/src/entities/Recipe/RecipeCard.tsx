import { Card, Link, CardContent, CardMedia, Typography } from "@mui/material";
import type { Recipe } from "./types";
import { Link as RouterLink } from "react-router-dom";
import { getImageUrl } from "../../shared/utils";


interface RecipeProps {
  recipe: Recipe;
}

export const RecipeCard = ({recipe}: RecipeProps) => {
  return (
    <Card>
      <CardMedia
        component={RouterLink}
        to={`/recipes/${recipe._id}`}
        image={getImageUrl(recipe.image)}
        sx={{
          height: 250,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          objectFit: "contain",
          objectPosition: "center",
          textAlign:"center",
        }}
      />

      <CardContent>

        <Link
          variant="h6"
          component={RouterLink}
          to={`/recipes/${recipe._id}`}
          sx={{display: "block", mb: 1}}
        >
          {recipe.title}
        </Link>

        <Typography variant="body2">
          By:{" "}
          <Link
            component={RouterLink}
            to={`/users/${recipe.author._id}`}
          >
            {recipe.author.displayName}
          </Link>
        </Typography>

      </CardContent>
    </Card>
  );
};