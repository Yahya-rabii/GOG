import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import GodLogo from "../images/GodLogo.png";

function Register() {
  const [cookies] = useCookies(["cookie-name"]);
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({ email: "", password: "" });
  const generateError = (error) => alert(error);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data } = await axios.post(
      "/api/auth/register",
      {
        ...values,
      },
      { withCredentials: true, validateStatus: () => true }
    );

    if (data.statusCode === 201) {
      return navigate("/login");
    }
    generateError(data.error);
  };
  return (
    <>
      <img className="image" src={GodLogo} alt="icon" height="50" />
      <div className="container">
        <h2>Register Account</h2>
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
            Already have an account ?<Link to="/login"> Login</Link>
          </span>
        </form>
      </div>
    </>
  );
}

export default Register;
