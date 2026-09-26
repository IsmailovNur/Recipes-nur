import { model, Schema, Types } from "mongoose";
import { IRecipe } from "../types";

const RecipeSchema = new Schema<IRecipe>({
  author: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  recipe: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "/images/no-image.svg",
  }
})

export const Recipe = model<IRecipe>('Recipe', RecipeSchema);