import { Router } from "express";
import { Recipe } from "../models/Recipe";
import { auth, authOptional } from "../middlewares/auth";
import { RequestWithUser } from "../types";
import { Types } from "mongoose";
import { upload } from "../multer";

const recipesRouter = Router();

recipesRouter.get('/', authOptional, async (req: RequestWithUser, res) => {
  try {
    const {author} = req.query;
    const filter: Record<string, unknown> = {};

    if (author) {
      if (
        typeof author !== "string" || !Types.ObjectId.isValid(author)
      ) {
        return res.status(400).send({error: "Invalid author ID!"});
      }
      filter.author = author;
    }


    const recipes = await Recipe.find(filter).populate('author', 'displayName');
    return res.send(recipes);

  } catch (err) {
    return res.status(500).send({error: 'Server error!'});
  }

});


recipesRouter.get('/:id', authOptional, async (req: RequestWithUser, res) => {
  try {
    const {id} = req.params;
    if (!Types.ObjectId.isValid(id as string)) {
      return res.status(400).send({error: "Invalid recipe ID!"});
    }

    const recipe = await Recipe.findOne().populate('author', 'displayName');

    if (!recipe || !recipe.author) {
      return res.status(404).send({error: 'Recipe not found!'});
    }

    return res.send(recipe);

  } catch (err) {
    return res.status(500).send({error: 'Server error!'});
  }
});


recipesRouter.post(
  '/',
  auth,
  upload.single('image'),
  async (req: RequestWithUser, res) => {
    try {
      const {title, recipe} = req.body;

      if (!req.user) {
        return res.status(401).send({error: "Unauthorized user!"});
      }

      if (typeof title !== "string" || !title.trim()) {
        return res.status(400).send({error: "Recipe title is required!"});
      }

      if (typeof recipe !== "string" || !recipe.trim()) {
        return res.status(400).send({error: "Recipe text is required!"});
      }

      const newRecipe = new Recipe({
        author: req.user._id,
        title: title.trim(),
        recipe: recipe.trim(),
        image: req.file ? 'images/' + req.file.filename : "/images/no-image.svg",
      });

      await newRecipe.save();
      return res.send(newRecipe);

    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).send({error: err.message});
      }
      return res.status(500).send({error: 'Server error!'});
    }

  })

export default recipesRouter;