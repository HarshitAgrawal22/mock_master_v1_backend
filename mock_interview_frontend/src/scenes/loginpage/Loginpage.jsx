import React from 'react';
import { FaUser, FaLock } from "react-icons/fa";
import './Loginpage.css';

import data from "../../state/data";
import { useNavigate } from 'react-router-dom'; // added to redirect login button to dashboard
// import jwt_decode from "jwt-decode";

const LoginForm = () => {
  const navigate = useNavigate();      // { FROM HERE }

  const handleLogin = () => {
    // Add your login logic here
    // For now, let's assume the login is successful
    console.log("on dashboard");
    navigate('/dashboard', { replace: true }); // Navigate to the dashboard page
  };     // { TO HERE } to set login button redirection to Dasboard {should be change}






  const handleSubmit = (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the form data
    const formData = {
      email: document.getElementById("username").value,
      password: document.getElementById("password").value,

    };

    fetch(`${data.url}user/login`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);


        console.log(json.token);

        // localStorage.setItem("access", json.token.access);
        if (json.token !== undefined && json.token !== null) {

          function setCookie(name, value, hours = 1) {
            const date = new Date();
            date.setTime(date.getTime() + (hours * 60 * 60 * 1000)); // 1 hour in milliseconds
            const expires = "expires=" + date.toUTCString();
            document.cookie = `${name}=${value}; ${expires}; path=/`;
          }

          setCookie('token', json.token);
          console.log("here is the topkekn =>             " + json);
          handleLogin();
        } else {
          document.getElementById("message").innerText = json.message
          document.getElementById("message").style.color = "red"
        }

      })
      .catch(error => {
        document.getElementById("response").innerText = error
      });
  };















  return (
    <div className="auth-page">
      <div className="max-w-md">
        <form action="" onSubmit={handleSubmit}>
          <h1  >Login</h1>
          <div className="mb-4 input-box">
            <input type="text" placeholder='Email..' id="username" required className="text-sm text-white" />
            <FaUser className='icon' />
          </div>
          <div className="mb-4 input-box">
            <input type="password" placeholder='Password' id="password" required="True" className="text-sm text-white" />
            <FaLock className='icon' />
          </div>
          <div className="flex justify-between mb-4 text-sm">

            <a id="message" href="#" className="text-white hover:underline">Welcome Back</a>
          </div>
          <label id="response"></label>
          <button type="submit" className="w-full h-10 py-2 text-sm font-bold text-gray-700 bg-white border border-gray-200 border-solid rounded-full cursor-pointer" >Login</button> {/* Remove( onClick={handleLogin}  ) */}
          <div className="mt-4 text-center">
            <span className="text-sm font-bold text-white">Don't have an account? <a href="/Signup" className="hover:underline">Register</a></span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;