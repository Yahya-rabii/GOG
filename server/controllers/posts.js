import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

const router = express.Router();

export const getPosts = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const postMessages = await PostMessage.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    // get total documents in the Product collection
    const count = await PostMessage.countDocuments();
    res.status(200).json({
      totalPages: Math.ceil(count / limit), // ceil c'est pour arrondire au cas ou nous avons un nombre avec virgule
      currentPage: page,
      success: true,
      count: postMessages.length,
      postMessages,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostMessage.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const { title, message, selectedFile, creator, tags } = req.body;
  const newPostMessage = new PostMessage({
    title,
    message,
    selectedFile,
    creator,
    tags,
  });
  try {
    await newPostMessage.save();
    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  await PostMessage.findByIdAndRemove(id);
  res.json({ message: "Post deleted successfully." });
};

export const getPages = async (_, res) => {
  // return the number of documents in the collection
  const count = await PostMessage.countDocuments();
  res.status(200).json({ totalPages: count / 5 });
};


export default router;