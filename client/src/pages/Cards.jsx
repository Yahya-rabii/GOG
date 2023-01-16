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
import "./style.css";


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

      const { data: pageNumbers } = await axios.get("/api/posts/pageNumbers", {
        validateStatus: () => true,
      });
      setTotalPages(pageNumbers.totalPages)

      if (data.statusCode === 200)
      setUser(data.user);
    })();
  }, []);

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0);


  const logOut = () => {
    Cookies.remove("jwt");
    navigate("/login");
  };



  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(getPosts(currentPage + 1));
      setCurrentPage(currentPage + 1)
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(getPosts(currentPage - 1));
      setCurrentPage(currentPage - 1)
    }
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
              spacing={3}>
              <Grid item xs={12} sm={7}>
                <Posts setCurrentId={setCurrentId} />
              </Grid>
              <Grid item xs={12} sm={4}>
                {user.isAdmin && (<Form currentId={currentId} setCurrentId={setCurrentId} />)}
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>





      <div className="mycontainer round">
        <div onClick={handlePrevPage} className="ctn">
          <h1 className="target">
            <div className="content">
              <div className="rounded" />
              <svg  height="32px" className="arrow" style={{ enableBackground: 'new 0 0 32 32' }} version="1.1" viewBox="0 0 32 32" width="32px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><path fill="#161616" d="M28,14H8.8l4.62-4.62C13.814,8.986,14,8.516,14,8c0-0.984-0.813-2-2-2c-0.531,0-0.994,0.193-1.38,0.58l-7.958,7.958  C2.334,14.866,2,15.271,2,16s0.279,1.08,0.646,1.447l7.974,7.973C11.006,25.807,11.469,26,12,26c1.188,0,2-1.016,2-2  c0-0.516-0.186-0.986-0.58-1.38L8.8,18H28c1.104,0,2-0.896,2-2S29.104,14,28,14z" /></svg>
            </div>
          </h1>
        </div>
        <div className="txt"><span>Page {currentPage}</span></div>
        <div onClick={handleNextPage} className="ctn">
          <h1 className="target">
            <div className="content reversed" style={{ float: 'right' }}>
              <div className="rounded" />
              <svg  height="32px" className="arrow reverse" style={{ enableBackground: 'new 0 0 32 32' }} version="1.1" viewBox="0 0 32 32" width="32px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><path fill="#161616" d="M28,14H8.8l4.62-4.62C13.814,8.986,14,8.516,14,8c0-0.984-0.813-2-2-2c-0.531,0-0.994,0.193-1.38,0.58l-7.958,7.958  C2.334,14.866,2,15.271,2,16s0.279,1.08,0.646,1.447l7.974,7.973C11.006,25.807,11.469,26,12,26c1.188,0,2-1.016,2-2  c0-0.516-0.186-0.986-0.58-1.38L8.8,18H28c1.104,0,2-0.896,2-2S29.104,14,28,14z" /></svg>
            </div>
          </h1>
        </div>
      </div>

    </>
  );
}
