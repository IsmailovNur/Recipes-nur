import { Schema, Types } from "mongoose";

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

  timestamps: {createdAt: true, updatedAt: false}

})