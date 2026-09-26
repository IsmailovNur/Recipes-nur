export interface RecipeAuthor {
  _id: string;
  displayName: string;
  username?: string;
  avatar?: string | null;
}

export interface Recipe {
  _id: string;
  author: RecipeAuthor;
  title: string;
  image: string | null;
  recipe: string;
}