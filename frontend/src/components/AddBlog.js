import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const lablestyle = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

const AddBlog = () => {
  const navigate = useNavigate();
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
  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:5000/api/blog/add", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.imageURL,
        user: localStorage.getItem("userId"),
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
      .then(() => navigate("/blogs"));
  };
  return (
    <div>
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
          <InputLabel sx={lablestyle}>ImageURL</InputLabel>
          <TextField
            name="imageURL"
            onChange={handleChange}
            value={inputs.imageURL}
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
    </div>
  );
};

export default AddBlog;
