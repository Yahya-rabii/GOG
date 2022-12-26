import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import GodLogo from '../images/GodLogo.png';
function Login() {
  const [cookies] = useCookies([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({ email: "", password: "" });
  const generateError = (error) =>
    alert(error);
  const handleSubmit = async (event) => {
    event.preventDefault();

      const { data } = await axios.post(
        "/api/auth/login",
        {
          ...values,
        },
        { withCredentials: true, validateStatus: () => true }
      );
      if (data.statusCode === 200) return navigate("/");
      generateError(data.error);
  };
  return (
    <>
      <img className="image" src={GodLogo} alt="icon" height="50" />
    <div className="container">
      <h2>Login to your Account</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Don't have an account ?<Link to="/register"> Register </Link>
        </span>
      </form>
    </div>
    </>
  );
}

export default Login;
