import {
  Avatar,
  Card,
  CardContent,
  Typography,
  CardHeader,
  CardMedia,
  Box,
  IconButton,
} from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Blog = ({ title, description, imageurl, username, isUser, id }) => {
  const navigate = useNavigate();
  const handleEdit = (e) => {
    navigate(`/myblogs/${id}`);
  };
  const deleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:5000/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleDelete = () => {
    deleteRequest()
      .then(() => navigate("/"))
      .then(() => navigate("/blogs"));
  };
  console.log(title, isUser);
  return (
    <div>
      <Card
        sx={{
          width: "40%",
          margin: "auto",
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": { boxShadow: "10px 10px 20px #ccc" },
        }}
      >
        {isUser && (
          <Box display="flex">
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }} color="warning">
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteOutlineIcon color="error"/>
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {username}
            </Avatar>
          }
          title={title}
        />
        <CardMedia
          component="img"
          height="194"
          image={imageurl}
          alt="Paella dish"
        />
        <CardContent>
          <hr />
          <br />
          <Typography variant="body2" color="text.secondary">
            <b>{username}</b> {": "} {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blog;
