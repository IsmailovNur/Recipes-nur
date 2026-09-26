import { Link, useParams } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector
} from "../../app/hooks";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { fetchRecipe } from "../../entities/Recipe/recipeThunk";
import { Spinner } from "../../shared/Spinner/Spinner";
import {
  Alert,
  Box,
  Button,
  Card,
  Divider,
  TextField,
  Typography
} from "@mui/material";
import { getImageUrl } from "../../shared/utils";

import {
  selectRecipe,
  selectRecipeError,
  selectRecipeLoading
} from "../../entities/Recipe/recipeSlice.ts";

import {
  selectComments,
  selectCommentsError,
  selectCommentsLoading
} from "../../entities/Comment/commentSlice.ts";

import {
  createComment,
  deleteComment,
  fetchComments
} from "../../entities/Comment/commentThunk.ts";

import { selectUser } from "../../entities/User/userSlice.ts";

const RecipePage = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();

  const recipe = useAppSelector(selectRecipe);
  const loading = useAppSelector(selectRecipeLoading);
  const error = useAppSelector(selectRecipeError);

  const comments = useAppSelector(selectComments);
  const commentsLoading = useAppSelector(selectCommentsLoading);
  const commentsError = useAppSelector(selectCommentsError);

  const user = useAppSelector(selectUser);

  const [text, setText] = useState("");

  useEffect(() => {
    if (id) {
      void dispatch(fetchRecipe(id));
      void dispatch(fetchComments(id));
    }
  }, [dispatch, id]);

  const submitCommentHandler = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!id || !text.trim()) {
      return;
    }

    try {
      await dispatch(
        createComment({
          recipeId: id,
          text: text.trim(),
        })
      ).unwrap();

      setText("");
    } catch (error) {
      console.log("Create comment error", error);
    }
  };

  const deleteCommentHandler = async (
    commentId: string
  ) => {
    try {
      await dispatch(deleteComment(commentId)).unwrap();
    } catch (error) {
      console.log("Delete comment error", error);
    }
  };

  if (loading) {
    return <Spinner isLoading />;
  }

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
        mb: 2,
        p: 2
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
          alignSelf: "center"
        }}
      />

      <Typography
        variant="body1"
        sx={{mt: 2, mb: 2}}
      >
        By:{" "}

        <Link to={`/users/${recipe.author._id}`}>
          {recipe.author.displayName}
        </Link>
      </Typography>

      <Typography
        sx={{whiteSpace: "pre-line", mb: 3}}
      >
        {recipe.recipe}
      </Typography>

      <Divider sx={{mb: 3}} />

      <Typography variant="h5" sx={{mb: 2}}>
        Comments
      </Typography>

      {commentsError && (
        <Alert severity="error" sx={{mb: 2}}>
          {commentsError}
        </Alert>
      )}

      {user && (
        <Box
          component="form"
          onSubmit={submitCommentHandler}
          sx={{
            display: "flex",
            gap: 2,
            mb: 3
          }}
        >
          <TextField
            fullWidth
            size="small"
            label="Comment"
            placeholder="Write a comment..."
            value={text}
            onChange={(event) => setText(event.target.value)
          }
          />

          <Button
            type="submit"
            variant="contained"
            disabled={!text.trim()}
          >
            Send
          </Button>
        </Box>
      )}
      {commentsLoading ? (<Spinner isLoading />) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2
          }}
        >
          {comments.length === 0 ? (
            <Typography color="text.secondary">
              No comments yet.
            </Typography>
          ) : (
            comments.map((comment) => {
              const canDelete = Boolean(
                user &&
                (
                  user._id === comment.author._id ||
                  user._id === recipe.author._id
                )
              );

              return (
                <Box key={comment._id}>
                  <Typography variant="subtitle2">
                    {comment.author.displayName}
                  </Typography>

                  <Typography
                    sx={{whiteSpace: "pre-line"}}
                  >
                    {comment.text}
                  </Typography>

                  {canDelete && (
                    <Button
                      size="small"
                      color="error"
                      onClick={() => void deleteCommentHandler(comment._id)}
                      sx={{mt: 0.5}}
                    >
                      Delete
                    </Button>
                  )}
                </Box>
              );
            })
          )}
        </Box>
      )}
    </Card>
  );
};

export default RecipePage;