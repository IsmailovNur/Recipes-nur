import { Router } from "express";
import { User } from "../models/User";
import mongoose from "mongoose";
import { auth } from "../middlewares/auth";
import { RequestWithUser } from "../types";
import config from "../config";
import { OAuth2Client } from "google-auth-library";
import { randomUUID } from "node:crypto";
import { upload } from "../multer";

const usersRouter = Router();

const googleClient = new OAuth2Client(config.googleClientID);

usersRouter.post(
  "/",
  upload.single("avatar"),
  async (req, res) => {
    try {
      const {username, password, displayName} = req.body;

      if (typeof username !== "string" || !username.trim()) {
        return res.status(400).send({error: "Username is required!"});
      }

      if (typeof password !== "string" || !password.trim()) {
        return res.status(400).send({error: "Password is required!"});
      }

      if (typeof displayName !== "string" || !displayName.trim()) {
        return res.status(400).send({error: "Display name is required!"});
      }

      const user = new User({
        username: username.trim(),
        password,
        displayName: displayName.trim(),
        avatar: req.file
          ? "images/" + req.file.filename
          : null,
      });

      user.generateToken();
      await user.save();
      return res.send(user);

    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      }

      if (e instanceof Error && "code" in e && e.code === 11000) {
        return res.status(400).send({error: "Username already registered!"});
      }

      return res.status(500).send({error: "Server error!"});
    }
  }
);

usersRouter.post(
  "/login",
  async (req, res) => {
    try {
      const {username, password} = req.body;

      if (typeof username !== "string" || !username.trim()) {
        return res.status(400).send({error: "Username is required!"});
      }

      if (typeof password !== "string" || !password.trim()) {
        return res.status(400).send({error: "Password is required!"});
      }

      const user = await User.findOne({username: username.trim()});

      if (!user) {
        return res.status(400).send({error: "Invalid username!"});
      }

      const isMatch = await user.checkPassword(password);

      if (!isMatch) {
        return res.status(400).send({error: "Invalid password!"});
      }

      user.generateToken();
      await user.save();
      return res.send(user);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send({error: e.message});
      }

      return res.status(500).send({error: "Server error!"});
    }
  }
);

usersRouter.post(
  "/login/google",
  async (req, res) => {
    try {
      const {credential} = req.body;

      if (typeof credential !== "string" || !credential.trim()) {
        return res.status(400).send({error: "Google credential is required!"});
      }

      const ticket = await googleClient.verifyIdToken({
        idToken: credential,
        audience: config.googleClientID,
      });

      const payload = ticket.getPayload();

      if (!payload) {
        return res.status(400).send({error: "Invalid Google credentials!"});
      }

      const email = payload.email;
      const googleID = payload.sub;
      const displayName = payload.name;

      if (!email || !googleID || !displayName) {
        return res.status(400).send({error: "Google account does not contain user data!"});
      }

      let user = await User.findOne({googleID});

      if (!user) {
        user = await User.findOne({username: email});
      }

      if (!user) {
        user = new User({
          username: email,
          password: randomUUID(),
          googleID,
          displayName,
          avatar: payload.picture || null,
        });
      } else {
        user.googleID = googleID;
        user.displayName = displayName;

        if (payload.picture) {
          user.avatar = payload.picture;
        }
      }

      user.generateToken();
      await user.save();
      return res.send(user);

    } catch (e) {
      console.error("Google login error:", e);

      return res.status(400).send({error: "Google authentication failed!"});
    }
  }
);

usersRouter.delete("/logout", auth, async (req: RequestWithUser, res) => {
    try {
      req.user!.generateToken();
      await req.user!.save();
      return res.send({message: "Logged out successfully!"});

    } catch (e) {
      return res.status(500).send({error: "Server error!"});
    }
  }
);

export default usersRouter;