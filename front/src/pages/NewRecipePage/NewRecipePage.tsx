import { useState, type ChangeEvent } from "react";
import {
  Alert,
  Box,
  Button,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import {
  selectRecipeError,
  selectRecipeLoading
} from "../../entities/Recipe/recipeSlice";
import { createRecipe } from "../../entities/Recipe/recipeThunk";
import { toast } from "react-toastify";

export const NewRecipePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loading = useAppSelector(selectRecipeLoading);
  const error = useAppSelector(selectRecipeError);

  const [state, setState] = useState({
    title: "",
    recipe: "",
    image: null as File | null,
  });

  const [submitted, setSubmitted] = useState(false);

  const inputChangeHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const {name, value} = e.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const imageChangeHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setState((prevState) => ({
      ...prevState,
      image: e.target.files?.[0] || null,
    }));
  };

  const submitHandler = async (e: React.SubmitEvent) => {
    e.preventDefault();

    setSubmitted(true);

    if (
      !state.title.trim() ||
      !state.recipe.trim() ||
      !state.image
    ) {
      return;
    }

    try {
      const createdRecipe = await dispatch(
        createRecipe({
          title: state.title.trim(),
          recipe: state.recipe.trim(),
          image: state.image,
        })
      ).unwrap();

      toast.success("Recipe created!");

      navigate(`/recipes/${createdRecipe._id}`);
    } catch (error) {
      console.log("Create recipe error", error);
    }
  };

  const titleError =
    submitted && !state.title.trim();

  const recipeError =
    submitted && !state.recipe.trim();

  const imageError =
    submitted && !state.image;

  return (
    <Box
      sx={{maxWidth: 700, mx: "auto"}}
    >
      <Paper sx={{p: 4}} variant="outlined">
        <Typography variant="h5" sx={{mb: 3}}>
          Add new recipe
        </Typography>

        {error && (
          <Alert severity="error" sx={{mb: 2}}>
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={submitHandler}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3
          }}
        >
          <TextField
            label="Title"
            name="title"
            value={state.title}
            onChange={inputChangeHandler}
            error={titleError}
            helperText={titleError ? "Title is required" : ""}
          />

          <TextField
            label="Recipe"
            name="recipe"
            value={state.recipe}
            onChange={inputChangeHandler}
            multiline
            minRows={8}
            error={recipeError}
            helperText={
            recipeError ? "Recipe is required" : ""}
          />

          <Button
            component="label"
            variant="outlined"
          >
            Choose image

            <input
              hidden
              type="file"
              accept="image/*"
              onChange={imageChangeHandler}
            />
          </Button>

          {state.image && (
            <Typography variant="body2">
              {state.image.name}
            </Typography>
          )}

          {imageError && (
            <Typography color="error">
              Image is required
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            loading={loading}
            disabled={loading}
          >
            Create recipe
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default NewRecipePage;