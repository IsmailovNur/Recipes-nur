import { NextFunction, Response } from 'express';
import { RequestWithUser } from "../types";
import { User } from "../models/User";


export const auth = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const token = req.get("Authorization")?.trim();

    if (!token) {
      return res.status(401).json({error: "No token provided!"});
    }

    const user = await User.findOne({token});
    if (!user) {
      return res.status(401).json({error: "Unauthorized: Invalid token!"});
    }

    req.user = user;
    next();

  } catch (err) {
    return res.status(500).send({error: "Server error!"});
  }
};

export const authOptional = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const token = req.get("Authorization")?.trim();

    if (token) {
      const user = await User.findOne({token});

      if (user) {
        req.user = user;
      }
    }
    next();

  } catch (e) {
    return res.status(500).send({error: "Server error!"});
  }
};