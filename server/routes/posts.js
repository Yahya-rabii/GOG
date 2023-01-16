import express from 'express';

import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  getPages,
} from "../controllers/posts.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", authMiddleware(true), createPost);
router.get("/pageNumbers", getPages);
router.get('/:id', getPost);
router.patch('/:id', authMiddleware(true), updatePost);
router.delete('/:id', authMiddleware(true), deletePost);

export default router;