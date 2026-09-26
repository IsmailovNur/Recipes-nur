import { Router } from "express";
import { Recipe } from "../models/Recipe";

const recipesRouter = Router();

recipesRouter.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();

    return res.send(recipes);

  } catch (err) {
    return res.status(500).send({error: 'Server error!'});
  }

})

export default recipesRouter;