import "./App.css";
import AddBlog from "./components/AddBlog";
import BlogDetails from "./components/BlogDetails";
import UserBlogs from "./components/UserBlog";
import Blogs from "./components/Blogs";
import Auth from "./components/Auth";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store";
import { useEffect } from "react";

function App() {
  const dispath = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);

  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          {!isLoggedIn ? (
            <Route path="/auth" element={<Auth />} />
          ) : (
            <>
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/myblogs" element={<UserBlogs />} />
              <Route path="/myblogs/:id" element={<BlogDetails />} />
              <Route path="/blogs/add" element={<AddBlog />} />
            </>
          )}
        </Routes>
      </main>
    </div>
  );
}

export default App;
