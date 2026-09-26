import mongoose, { Schema, Types } from "mongoose";
import { IComment } from "../types";

const CommentSchema = new Schema({
    author: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },

    recipe: {
      type: Types.ObjectId,
      ref: 'Recipe',
      required: true,
    },

    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {timestamps: {createdAt: true, updatedAt: false}}
)

export const Comment = mongoose.model<IComment>("Comment", CommentSchema);