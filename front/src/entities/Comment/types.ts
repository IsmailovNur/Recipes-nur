export interface Comment {
  author: {
    _id: string;
    username: string;
    displayName: string;
    avatar: File;
  };
  recipe: string;
  text: string;
  createdAt: string;
}