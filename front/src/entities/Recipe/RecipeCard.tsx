import {
  Button,
  Card,
  CardActions,
  Link,
  CardContent,
  CardMedia,
  Typography
} from "@mui/material";
import type { Recipe } from "./types";
import { Link as RouterLink } from "react-router-dom";
import { getImageUrl } from "../../shared/utils";

interface RecipeProps {
  recipe: Recipe;
  showDelete?: boolean;
  onDelete?: () => void;
}

export const RecipeCard = ({
                             recipe,
                             showDelete = false,
                             onDelete,
                           }: RecipeProps) => {
  return (
    <Card>
      <CardMedia
        component={RouterLink}
        to={`/recipes/${recipe._id}`}
        image={getImageUrl(recipe.image)}
        sx={{
          height: 250,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
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

      {showDelete && onDelete && (
        <CardActions>
          <Button
            size="small"
            color="error"
            onClick={onDelete}
          >
            Delete
          </Button>
        </CardActions>
      )}
    </Card>
  );
};