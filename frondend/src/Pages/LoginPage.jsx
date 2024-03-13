import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const LoginForm = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("")
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

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


    if (true) {
      try {
        const userData = { username, password };
        const response = await axios.post(
          "http://localhost:3000/login",
          userData, { headers: { 'Content-Type': 'application/json' } }
        );
        alert("Sent");

        if (response.status===200) {
          console.log("Login successful!");
          setUsername("");
          setPassword("");

          // Handle successful login (e.g., navigate, store data)
          const loginData = response.data;
          console.log("Login response data:", loginData);
          navigate("/action", { state: loginData });
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
  }

    return (
      <div className="mx-auto">
        <form
          onSubmit={handleSubmit}
          className="flex flex-row justify-center items-center space-x-4"
        >
          {/* Error message (optional) */}

          <div className="flex flex-row">
            <label htmlFor="username" className="text-sm font-medium pt-3 px-2">
              Username<span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="username"
              className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500 focus:ring-opacity-50"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="flex flex-row">
            <label htmlFor="password" className="text-sm font-medium pt-3 px-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500 focus:ring-opacity-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white  py-2 px-4 rounded-lg shadow"
          >
            SIGN IN
          </button>
      
        </form>
        {errorMessage && (
          <div className="  my-4 text-red-500 text-center">{errorMessage}</div>
        )}
      </div>
    );
  };

export default LoginForm;
