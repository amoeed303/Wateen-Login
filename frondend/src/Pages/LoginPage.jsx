import React, { useState } from "react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

    // Simulate sending data (no real backend yet)
    if (isValid) {
      const userData = { username, password };
      console.log("Form data:", userData);

      // (Next steps: Handle successful login or error)
    }
  };

  return (
    <div>
    <form
      onSubmit={handleSubmit}
      className="flex flex-row justify-center items-center space-x-4"
    >
      {/* Error message (optional) */}

      <div className="flex flex-row">
        <label htmlFor="username" className="text-sm font-medium pt-2 px-2">
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
        <label htmlFor="password" className="text-sm font-medium pt-2 px-2">
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
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow"
      >
        Login
      </button>
      
      </form>
       {errorMessage && (
        <div className="text-red-500 text-center">{errorMessage}</div>
      )}
      </div>
  );
};

export default LoginForm;
