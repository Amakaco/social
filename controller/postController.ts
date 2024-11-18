import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from "../model/userModel";
import postModel from "../model/postModel";
import { Types } from "mongoose";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { message } = req.body;

    const findUser = await userModel.findById(userID);

    if (findUser) {
      const post: any = await postModel.create({
        message,
      });

      findUser.post.push(new Types.ObjectId(post?._id));
      findUser.save();

      return res.status(201).json({
        message: "User's Post created successfully",
        data: post,
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

export const getAllPost = async (req: Request, res: Response) => {
  try {
    const post = await postModel.find();

    return res.status(200).json({
      message: "post found successfully",
      data: post,
      status: 200,
    });
  } catch (error) {
    return res.status(404).json({
      error: error,
    });
  }
};

export const getOneUserPost = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user = await userModel.findById(userID).populate({
      path: "post",
      options: {
        sort: {
          createdAt: -1,
        },
      },
    });

    return res.status(200).json({
      message: "User created successfully",
      data: user,
      status: 200,
    });
  } catch (error) {
    return res.status(404).json({
      error: error,
    });
  }
};

export const LikeOneUserPost = async (req: Request, res: Response) => {
  try {
    const { userID, postID } = req.params;
    const user = await userModel.findById(userID);
    const post: any = await postModel.findById(postID);

    await postModel.findByIdAndUpdate(
      postID,
      {
        like: [...post.like, userID],
      },
      { new: true }
    );

    return res.status(200).json({
      message: "like created successfully",
      data: user,
      status: 200,
    });
  } catch (error) {
    return res.status(404).json({
      error: error,
    });
  }
};
