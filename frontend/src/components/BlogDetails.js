import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const lablestyle = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

const BlogDetails = () => {
  const navigate = useNavigate();
  const [blogs, setblogs] = useState();
  const id = useParams().id;
  console.log(id);
  const [inputs, setinputs] = useState({
    title: "",
    description: "",
    imageURL: "",
  });
  const handleChange = (e) => {
    setinputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const fetchDetail = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    fetchDetail().then((data) => {
      setblogs(data.blog);
      setinputs({
        title: data.blog.title,
        description: data.blog.description,
      });
    });
  }, [id]);
  const sendRequest = async () => {
    const res = await axios
      .put(`http://localhost:5000/api/blog/update/${id}`, {
        title: inputs.title,
        description: inputs.description,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/myblogs"));
  };
  return (
    <div>
      {inputs && (
        <form onSubmit={handleSubmit}>
          <Box
            border={3}
            borderColor="green"
            borderRadius={18}
            boxShadow="10px 10px 20px #ccc"
            padding={3}
            margin={"auto"}
            marginTop={"10px"}
            display="flex"
            flexDirection="column"
            width={"80%"}
          >
            <Typography
              fontWeight={"bold"}
              padding={1}
              color="gray"
              variant="h2"
              textAlign={"center"}
            >
              Post your Blog
            </Typography>
            <InputLabel sx={lablestyle}>Title</InputLabel>
            <TextField
              name="title"
              onChange={handleChange}
              value={inputs.title}
            />
            <InputLabel sx={lablestyle}>Description</InputLabel>
            <TextField
              name="description"
              onChange={handleChange}
              value={inputs.description}
            />

            <Button
              sx={{ mt: 2, borderRadius: 4 }}
              variant="contained"
              color="warning"
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
};

export default BlogDetails;
