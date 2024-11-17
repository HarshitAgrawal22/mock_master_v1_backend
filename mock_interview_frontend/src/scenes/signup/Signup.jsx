import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaPhone, FaEnvelope, FaUpload } from "react-icons/fa";
import { MdDomain } from "react-icons/md";
import './Signup.css';
import data from "../../state/data";

const Signup = () => {
  const navigate = useNavigate();

  const handleRegister = () => {

    navigate('/LoginForm', { replace: true });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    document.getElementById("message").innerText = "WAIT"
    document.getElementById("message").style.color = "yellow";
    const resumeInput = document.getElementById("resume");
    const cvInput = document.getElementById("cv");
    const resumeFile = resumeInput.files[0];
    const cvFile = cvInput.files[0];

    if (!resumeFile || !cvFile) {
      alert("Please select both resume and CV.");
      return;
    }

    const uploadFile = async (file) => {
      const formData = new FormData();
      formData.append("pdf", file);

      try {
        const response = await fetch(
          "http://popcornwar.pythonanywhere.com/student/resume/",
          {
            method: "POST",
            body: formData,
          }
        );
        return await response.json();
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Error uploading file.");
        throw error;
      }
    };

    try {
      const resumeResponse = await uploadFile(resumeFile);
      const cvResponse = await uploadFile(cvFile);
      console.log(resumeResponse.pdf, cvResponse.pdf);
      const payload = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        name: document.getElementById("name").value,
        branch: document.getElementById("domain").value,
        batch: "2022-2026",
        resume: resumeResponse.pdf,
        cv: cvResponse.pdf,
      };



      console.log(JSON.stringify(payload))
      const finalResponse = await fetch(`${data.url}user/register`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(payload)
      });

      const finalResult = await finalResponse.json();
      console.log(finalResult);
      if (finalResult.status) {
        handleRegister();
      } else {
        document.getElementById("message").innerText = finalResult.message;
        document.getElementById("message").style.color = "red";
      }
    } catch (error) {
      console.error("Error during submission:", error);
      alert("Error during submission.");
    }
  };

  return (
    <div className="auth-page">
      <div className="max-w-md">
        <form onSubmit={handleSubmit}>
          <h1>Signup</h1>
          <div className="mb-4 input-box">
            <input type="email" placeholder='Email' required className="text-sm text-white" id="email" />
            <FaEnvelope className='icon' />
          </div>
          <div className="mb-4 input-box">
            <input type="text" placeholder='Name' required className="text-sm text-white" id="name" />
            <FaUser className='icon' />
          </div>
          <div className="mb-4 input-box">
            <input type="password" placeholder='Password' required className="text-sm text-white" id="password" />
            <FaLock className='icon' />
          </div>
          <div className="mb-4 input-box">
            <input type="text" placeholder='Domain' required className="text-sm text-white" id="domain" />
            <MdDomain class="icon" />
          </div>
          <div className="mb-4 input-box file-input">
            <label htmlFor="resume" className="block text-white">Resume (PDF)</label>
            <input type="file" accept="application/pdf" className="text-sm text-white" id="resume" required />
            <FaUpload className='icon' />
          </div>
          <div className="mb-4 input-box file-input">
            <label htmlFor="cv" className="block text-white">CV (PDF)</label>
            <input type="file" accept="application/pdf" className="text-sm text-white" id="cv" required />
            <FaUpload className='icon' />
          </div>
          <button type="submit" className="w-full h-10 py-2 text-sm font-bold text-gray-700 bg-white border border-gray-200 border-solid rounded-full cursor-pointer">Signup</button>
          <div className="mt-4 text-center">
            <span className="text-sm font-bold text-white">Already a member?<a href="/LoginForm" className="hover:underline" >Login</a></span>
          </div>
          <div id="message" className="text-center"></div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
