import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
const Blogs = () => {
  const [blogs, setblogs] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:5000/api/blog")
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setblogs(data.blog));
  }, []);
  console.log(blogs);
  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            isUser={localStorage.getItem("userId") === blog.user._id}
            key={index}
            title={blog.title}
            description={blog.description}
            imageurl={blog.image}
            username={blog.user.name}
          />
        ))}
    </div>
  );
};

export default Blogs;
