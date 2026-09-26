import { HydratedDocument, Types } from 'mongoose';
import { Request } from "express";


export interface IRecipe {
  author: Types.ObjectId;
  title: string;
  image: string | null;
  recipe: string;
}

export interface IUser {
  username: string;
  password: string;
  token: string;
  displayName: string;
  avatar?: string | null;
  googleID?: string;

  checkPassword(password: string): Promise<boolean>;

  generateToken(): void;
}

export interface IComment {
  author: Types.ObjectId;
  recipe: Types.ObjectId;
  text: string;
  createdAt: Date;
}

export interface RequestWithUser extends Request {
  user?: HydratedDocument<IUser>;
}
