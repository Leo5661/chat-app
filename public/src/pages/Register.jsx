import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";
import Colors from "../assets/Colors";
import Logo from "../assets/logo.svg";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/ApiRoutes";

function Register() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toastConfig = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    if (handleValidation()) {
      const { username, email, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.message, toastConfig);
      }

      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  }

  function handleValidation() {
    const { username, email, password, confirmPassword } = values;

    if (username.length < 3) {
      toast.error("Username must be 4 characters or more.", toastConfig);
      return false;
    } else if (email === "") {
      toast.error("Email must be filled", toastConfig);
      return false;
    } else if (password.length >= 4) {
      if (password !== confirmPassword) {
        toast.error("Password and confirm password must be same.", toastConfig);
        return false;
      }
    } else {
      toast.warning("Password must be 4 characters long.", toastConfig);
      return false;
    }

    return true;
  }

  function handleOnChange(event) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  return (
    <div>
      <FormBox>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>Cat Chat</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleOnChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleOnChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleOnChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleOnChange(e)}
          />
          <button type="submit">Create Cat</button>
          <span>
            I'm old cat? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormBox>
      <ToastContainer />
    </div>
  );
}

const FormBox = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: ${Colors.backgroundColor};

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    img {
      height: 5rem;
    }

    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: ${Colors.lightBgColor};
    border-radius: 2rem;
    padding: 3rem 5rem;

    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid ${Colors.blue};
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid ${Colors.onFocusInputBorder};
        outline: none;
      }
    }
  }
  button {
    background-color: ${Colors.buttonBgColor};
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercas;
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: ${Colors.blue};
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    a {
      color: ${Colors.blue};
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Register;
