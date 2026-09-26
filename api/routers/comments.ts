import { Router } from "express";
import { Types } from "mongoose";
import { Comment } from "../models/Comment"
import { Recipe } from "../models/Recipe";
import { RequestWithUser } from "../types";
import { auth } from "../middlewares/auth";

const commentsRouter = Router();

commentsRouter.get("/", async (req, res) => {
  try {
    const recipeId = req.query.recipeId as string;

    if (!recipeId) {
      return res.status(400).send({error: 'recipeId is required!',});
    }

    if (!Types.ObjectId.isValid(recipeId)) {
      return res.status(400).send({error: 'Invalid recipe ID!',});
    }

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).send({error: 'Recipe Id not exists!',});
    }

    const comments = await Comment.find({recipe: recipeId,})
      .sort({createdAt: -1})
      .populate('author', 'username displayName avatar');

    return res.send(comments);

  } catch (err) {
    return res.status(500).send({error: 'Server error!'});
  }
});

commentsRouter.post("/", auth, async (req: RequestWithUser, res) => {
  try {
    const {recipeId, text} = req.body;

    if (!recipeId) {
      return res.status(400).send({error: 'recipeId is required!',});
    }

    if (!Types.ObjectId.isValid(recipeId)) {
      return res.status(400).send({error: 'Invalid recipe ID!',});
    }

    if (typeof text !== "string" || !text.trim()) {
      return res.status(400).send({error: 'Invalid text message!',});
    }

    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).send({error: 'Recipe not found!'});
    }

    const comment = await Comment.create({
      author: req.user!._id,
      recipe: recipeId,
      text: text.trim(),
    });

    const populatedComment = await comment.populate(
      'author',
      'username displayName avatar',
    );

    return res.status(201).send(populatedComment);

  } catch (err) {
    return res.status(500).send({error: 'Server error!'});
  }
});

commentsRouter.delete("/:id", auth, async (req: RequestWithUser, res) => {
  try {
    const {id} = req.params;

    if (!Types.ObjectId.isValid(id as string)) {
      return res.status(400).send({error: 'Invalid Comment Id!'});
    }

    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).send({error: 'Invalid not found!'});
    }

    const recipe = await Recipe.findById(comment.recipe);
    if (!recipe) {
      return res.status(404).send({error: 'Recipe not found!'});
    }


    const currentUserId = req.user!._id.toString();
    const isAuthor = comment.author._id.toString() === currentUserId;
    const isRecipeAuthor = recipe.author.toString() === currentUserId;

    if (!isAuthor && !isRecipeAuthor) {
      return res.status(403).send({error: 'Only isAuthors can delete comment!'});
    }

    await Comment.deleteOne()
    return res.send({message: 'Comment deleted successfully!'});

  } catch (err) {
    return res.status(500).send({error: 'Server error!'});
  }
})


export default commentsRouter;

