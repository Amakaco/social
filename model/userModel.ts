import { Schema, Document } from "mongoose";
import { Types } from "mongoose";
import { model } from "mongoose";

interface iUser {
  email: string;
  password: string;
  userName: string;
  avatar: string;
  avatarID: string;
  post: Array<{}>;
}

interface iUserData extends iUser, Document {}

const userModel = new Schema<iUserData>(
  {
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    userName: {
      type: String,
    },
    avatar: {
      type: String,
    },
    avatarID: {
      type: String,
    },
    post: [
      {
        type: Types.ObjectId,
        ref: "posts",
      },
    ],
  },
  { timestamps: true }
);
export default model<iUserData>("users", userModel);
