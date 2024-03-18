import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import Home from "../assets/homepage.jpg";
const LoginForm = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userIP, setUserIP] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      Cookies.set("IsLoggedIn", "false");
      //get client ip
      fetch("https://api.ipify.org?format=json")
        .then((response) => response.json())
        .then((data) => setUserIP(data.ip))
        .catch((error) => console.log(error));
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Basic validations
    let isValid = true;
    setErrorMessage(""); // Clear any previous errors

    if (username.trim() === "") {
      isValid = false;
      setErrorMessage("Username cannot be empty.");
    } else if (password.trim() === "") {
      isValid = false;
      setErrorMessage("Password cannot be empty.");
    } else if (password.length < 6) {
      isValid = false;
      setErrorMessage("Password must be at least 6 characters long.");
    }

    if (isValid) {
      try {
        const userData = { username, password, userIP };
        const response = await axios.post(
          "http://localhost:3000/login",
          userData,
          { headers: { "Content-Type": "application/json" } }
        );
        alert("Sent");

        if (response.status === 200) {
          console.log("Login successful!");
          Cookies.set("IsLoggedIn", "true"); //set cookie for protected route
          setUsername("");
          setPassword("");

          // Handle successful login (e.g., navigate, store data)
          const loginData = response.data;
          console.log("Login response data:", loginData);
          navigate("/action");
        } else {
          throw new Error("Login failed"); // Handle errors from the server
        }
      } catch (error) {
        console.log("Error logging in:", error);
        setErrorMessage(
          "Login failed. Please check your username and password."
        ); // Display user-friendly error message
      }
    }
  };

  return (
    <div className=" flex justify-center items-center ">
      <div className="flex-col ">
        <form
          onSubmit={handleSubmit}
          className="flex  justify-center items-center space-x-4"
        >
          {/* Error message (optional) */}

          <div className=" flex-row">
            <label htmlFor="username" className="text-sm font-medium pt-3 px-2">
              Username<span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="username"
              className="rounded-lg border text-sm border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500 focus:ring-opacity-50"
              value={username}
              onChange={(e) => setUsername(e.target.value.trim())}
            />
          </div>

          <div className="flex-row">
            <label htmlFor="password" className="text-sm font-medium pt-3 px-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="rounded-lg border text-sm border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500 focus:ring-opacity-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white text-sm  py-2 px-4 rounded-lg shadow"
          >
            SIGN IN
          </button>
        </form>
        {errorMessage && (
          <div className="  my-4 text-red-500 text-center">{errorMessage}</div>
        )}
        <img
          src={Home}
          className="flex-col  py-2 w-full "
          alt="home page Wateen"
        />
      </div>
    </div>
  );
};

export default LoginForm;
