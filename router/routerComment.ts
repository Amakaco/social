import { Router } from "express";

import {
  createComment,
  getAllComment,
  geTOneUserComment,
  LikeOneUserComment,
} from "../controller/commentController";

const router: any = Router();
router.route("/create-comment").post(createComment);
router.route("/get-all-comment").get(getAllComment);

router.route("/get-user-comment/:userID").post(geTOneUserComment);

router.route("/like-comment/:userID/:postID").post(LikeOneUserComment);
export default router;
