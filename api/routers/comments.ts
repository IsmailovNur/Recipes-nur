import { Router } from "express";
import { Types } from "mongoose";
import { Comment } from "../models/Comment"
import { Recipe } from "../models/Recipe";

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


})


export default commentsRouter;

