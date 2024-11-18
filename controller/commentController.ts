import { Request, Response } from "express";
import bcrypt from "bcrypt";

import commentModel from "../model/commentModel";

export const createComment = async (req: Request, res: Response) => {
  try {
    const { userName, avatar, avatarID, text, like, post } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(avatarID, salt);
    const comment = await commentModel.create({
      userName,
      avatar,
      text,
      avatarID: hashed,
      like,
      post,

      status: 201,
    });
  } catch (error) {
    return res.status(400).json({
      error: error,
    });
  }
};

export const getAllComment = async (req: Request, res: Response) => {
  try {
    const comment = await commentModel.find();

    return res.status(200).json({
      message: "Comment created successfully",
      data: comment,
      status: 200,
    });
  } catch (error) {
    return res.status(404).json({
      erroe: error,
    });
  }
};

export const geTOneUserComment = async (req: Request, res: Response) => {
  try {
    const { commentID } = req.params;
    const comment = await commentModel.findById(commentID);

    return res.status(200).json({
      message: "Comment created successfully",
      data: comment,
      status: 200,
    });
  } catch (error) {
    return res.status(404).json({
      error: error,
    });
  }
};

export const LikeOneUserComment = async (req: Request, res: Response) => {
  try {
    const { commentID } = req.params;
    const { userID } = req.body;

    const findComment = await commentModel.findById(commentID);

    if (findComment) {
      findComment.like.toString(userID);
      findComment.save();

      return res.status(201).json({
        message: "Comment liked successfully",
        data: findComment,
        status: 201,
      });
    } else {
      return res.status(404).json({
        message: "Error getting Users",
      });
    }
  } catch (error) {
    return res.status(404).json({
      error: error,
    });
  }
};
