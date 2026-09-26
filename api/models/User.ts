import { model, Schema } from "mongoose";
import { IUser } from "../types";
import bcrypt from 'bcrypt';
import { randomUUID } from "node:crypto";

const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async function (this: any, value: string): Promise<boolean> {
        if (!this.isModified('username')) return true;

        const user = await User.findOne({ username: value });
        return !Boolean(user);
      },
      message: "Username already registered!"
    }
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
    trim: true,
  },
  googleID: String,
  avatar: {
    type: String,
    default: null,
  },
});

UserSchema.pre("save", async function () {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.checkPassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
  this.token = randomUUID();
};

UserSchema.set('toJSON', {
  transform: (doc, ret: Partial<IUser>) => {
    delete ret.password;
    return ret;
  },
});

export const User = model<IUser>('User', UserSchema);