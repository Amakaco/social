import { Schema, Document } from "mongoose";
import { Types } from "mongoose";
import { model } from "mongoose";

interface iComment {
  userName: string;
  avatar: string;
  text: string;
  avatarID: string;
  like: number;
  post: Array<{}>;
}

interface iCommentData extends iComment, Document {}

const CommentModel = new Schema<iCommentData>(
  {
    userName: {
      type: String,
    },

    avatar: {
      type: String,
    },
    text: {
      type: String,
      required: true,
    },
    avatarID: {
      type: String,
    },
    like: {
      type: Number,
      default: 0,
    },
    post: [
      {
        type: Types.ObjectId,
        ref: "comments",
      },
    ],
  },
  { timestamps: true }
);
export default model<iCommentData>("Comments", CommentModel);
