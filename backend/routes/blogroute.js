import Express from "express";

import { addBlog, deleteBlog, getAllBlogs, getByUserId, getByid, updateBlog } from "../controller/blog-controller";

const blogRouter = Express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id",updateBlog);
blogRouter.get("/:id",getByid);
blogRouter.delete("/:id",deleteBlog);
blogRouter.get("/user/:id",getByUserId);
export default blogRouter;
