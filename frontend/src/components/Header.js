import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
//F708b3
const Header = () => {
  const dispach = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const [value, setvalue] = useState(0);
  return (
    <div>
      <AppBar
        position="sticky"
        sx={{
          background:
            "linear-gradient(113deg, rgba(34,195,93,1) 2%, rgba(168,187,162,1) 10%, rgba(111,191,143,1) 35%, rgba(133,190,128,1) 45%, rgba(221,184,61,1) 58%, rgba(203,188,80,1) 77%, rgba(216,188,71,1) 83%)",
        }}
      >
        <Toolbar>
          <Typography variant="h4">BlogApp</Typography>
          {isLoggedIn && (
            <Box display="flex" marginLeft={"auto"} marginRight={"auto"}>
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => setvalue(val)}
              >
                
                <Tab LinkComponent={Link} to="/blogs" label="All Blogs" />
                <Tab LinkComponent={Link} to="/myblogs" label="My Blogs" />
                <Tab LinkComponent={Link} to="/blogs/add" label="Add Blogs" />
              </Tabs>
            </Box>
          )}
          <Box display="flex" marginLeft="auto">
            {!isLoggedIn && (
              <>
                {" "}
                <Button
                  LinkComponent={Link}
                  to="/auth"
                  variant="contained"
                  color="warning"
                  sx={{ margin: 1, borderRadius: 10 }}
                >
                  Login
                </Button>
                <Button
                  onClick={() => dispach(authActions.logout())}
                  LinkComponent={Link}
                  to="/auth"
                  variant="contained"
                  color="warning"
                  sx={{ margin: 1, borderRadius: 10 }}
                >
                  Signup
                </Button>
              </>
            )}
            {isLoggedIn && (
              <>
             
              <Button
              
                to="/auth"
                LinkComponent={Link}
                variant="contained"
                color="warning"
                sx={{ margin: 1, borderRadius: 10 }}
              >
                LOGOUT
              </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
