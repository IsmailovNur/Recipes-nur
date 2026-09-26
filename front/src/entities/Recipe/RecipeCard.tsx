import { Card, Link, CardContent, CardMedia, Typography } from "@mui/material";
import type { Recipe } from "./types";
import { Link as RouterLink } from "react-router-dom";
import { getImageUrl } from "../../shared/utils";
import { AppRoutes } from "../../routing/routes.ts";


interface RecipeProps {
  recipe: Recipe;
}

export const RecipeCard = ({recipe}: RecipeProps) => {
  return (
    <Card>
      <CardMedia
        component={RouterLink}
        to={AppRoutes.main}
        image={getImageUrl(recipe.image)}
        sx={{
          height: 250,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          objectFit: "contain",
          objectPosition: "center",
        }}
      />

      <CardContent>

        <Link
          variant="h6"
          component={RouterLink}
          to={AppRoutes.main}
          sx={{display: "block", mb: 1}}
        >
          {recipe.title}
        </Link>

        <Typography variant="body2">
          By:{" "}
          <Link
            component={RouterLink}
            to={AppRoutes.main}
          >
            {recipe.author.displayName}
          </Link>
        </Typography>

      </CardContent>
    </Card>
  );
};