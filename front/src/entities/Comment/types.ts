import type { RecipeAuthor } from "../Recipe/types.ts";

export interface Comment {
  author: RecipeAuthor;
  recipe: string;
  text: string;
  createdAt: string;
}