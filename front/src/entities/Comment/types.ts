import type { RecipeAuthor } from "../Recipe/types.ts";

export interface Comment {
  _id: string;
  author: RecipeAuthor;
  recipe: string;
  text: string;
  createdAt: string;
}