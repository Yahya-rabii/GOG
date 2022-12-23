import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

import { Container, AppBar, Grow, Grid } from '@material-ui/core';
import Posts from '../components/Posts/Posts';
import Form from '../components/Form/Form';
import GodLogo from '../images/GodLogo.png';
import { useDispatch } from "react-redux";

import { getPosts } from "../actions/posts";
import useStyles from "../styles";

export default function Cards() {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "/",
          {},
          {
            withCredentials: true,
          }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        } else
         alert(`Hi ${data.user}`)
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };
  return (
    <>
      <div className="private">
        <h1>Admin dashboard</h1>
        <button onClick={logOut}>Log out</button>
      </div>

      <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <img className={classes.image} src={GodLogo} alt="icon" height="50" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justifyContent ="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
    </>
  );
}
