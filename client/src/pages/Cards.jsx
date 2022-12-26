import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Cookies from "js-cookie";
import { Container, AppBar, Grow, Grid } from "@material-ui/core";
import Posts from "../components/Posts/Posts";
import Form from "../components/Form/Form";
import GodLogo from "../images/GodLogo.png";
import { useDispatch } from "react-redux";

import { getPosts } from "../actions/posts";
import useStyles from "../styles";

export default function Cards() {
  const navigate = useNavigate();
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [user, setUser] = useState({
    id: "",
    email: "",
    isAdmin: false,
  });

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/api/auth/me", {
        validateStatus: () => true,
        withCredentials: true,
      });
      if (data.statusCode === 200)
      setUser(data.user);
    })();
  }, []);

  const logOut = () => {
    Cookies.remove("jwt");
    navigate("/login");
  };
  return (
    <>



      <Container maxWidth="lg">
        <AppBar className={classes.appBar} position="static" color="inherit">
          <img className={classes.image} src={GodLogo} alt="icon" height="50" />
          <button onClick={logOut} className="logout" >Log out</button>
        </AppBar>
        <Grow in>
          <Container>
            <Grid
              container
              justifyContent="space-between"
              alignItems="stretch"
              spacing={3}
            >
              <Grid item xs={12} sm={7}>
                <Posts setCurrentId={setCurrentId} />
              </Grid>
              <Grid item xs={12} sm={4}>
                {user.isAdmin && (
                  <Form currentId={currentId} setCurrentId={setCurrentId} />
                )}
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
    </>
  );
}
