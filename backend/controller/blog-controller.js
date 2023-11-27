import mongoose from "mongoose";
import Blog from "../model/Blog";
import User from "../model/User";

export const getAllBlogs = async (req, res, next) => {
  let blog;
  try {
    blog = await Blog.find().populate("user");
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(404).json({ message: "No Blog is Found" });
  }
  return res.status(200).json({ blog });
};

export const addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;
  let exitingUser;
  try {
    exitingUser = await User.findById(user);
  } catch (err) {
    console.log(err);
  }
  if (!exitingUser) {
    return res.status(400).json({ message: "Unable to find user this id" });
  }

  const blog = new Blog({
    title,
    description,
    image,
    user,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    exitingUser.blog.push(blog);
    await exitingUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    return console.log(err);
    return res.status(500).json({ message: err });
  }
  return res.status(200).json({ blog });
};
export const updateBlog = async (req, res, next) => {
  const { title, description } = req.body;
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "unable to Update the Blog" });
  }
  return res.status(200).json({ blog });
};

export const getByid = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(404).json({ message: "No blog is Found" });
  }
  return res.status(200).json({ blog });
};
export const deleteBlog = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndRemove(id).populate("user");
    await blog.user.blog.pull(blog);
    await blog.user.save();
  } catch (err) {
    console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable to delete" });
  }
  return res.status(200).json({
    message: "delete successfully",
  });
};

export const getByUserId = async (req, res, next) => {
  const userId = req.params.id;
  let userBlog;
  try {
    userBlog = await User.findById(userId).populate("blog");
  } catch (err) {
    return console.log(err);
  }
  if (!userBlog) {
    return res.status(404).json({ message: "No blog is found" });
  }
  return res.status(200).json({ user: userBlog });
};
