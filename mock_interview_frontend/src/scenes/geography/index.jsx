import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import datas from "../../state/data";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Form = () => {
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleQuestions = (ArrayOfQuestions, resume, cv) => {
    navigate('/monthly', { state: { questions: ArrayOfQuestions, cv: cv, resume: resume } });
  };

  if (datas.getCookie("token") === null || datas.getCookie("token") === undefined) {
    navigate('/loginForm');
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    navigate('/loading'); // Navigate to the loading page

    const resumeInput = document.getElementById("resume");
    const cvInput = document.getElementById("cv");
    const resumeFile = resumeInput.files[0];
    const cvFile = cvInput.files[0];

    if (!resumeFile || !cvFile) {
      alert("Please select both resume and CV.");
      navigate(-1); // Go back if there's an error
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
        navigate(-1); // Go back if there's an error
      }
    };

    const token = datas.getCookie("token");
    const resumeResponse = await uploadFile(resumeFile);
    const cvResponse = await uploadFile(cvFile);
    fetch(`${datas.url}ai/generate_questions`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        token: token,
        resume: resumeResponse.pdf,
        cv: cvResponse.pdf,
      })
    })
      .then(response => response.json())
      .then(json => {
        handleQuestions(json.questions, resumeResponse.pdf, cvResponse.pdf);
      })
      .catch(error => {
        document.getElementById("response").innerText = error;
        navigate(-1); // Go back if there's an error
      });
  };

  return (
    <Box m="20px">
      <Header title="Start Interview" subtitle="Enter the necessary details" />
      <Formik
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleFormSubmit}>
            <Box display="flex" alignItems="center" mb="20px">
              <Box mt="20px" sx={{ display: "flex", flexDirection: "column" }}>
                <Button
                  variant="contained"
                  component="label"
                  color="primary"
                  sx={{ mb: 2, padding: "10px 20px", fontWeight: "bold", textTransform: "capitalize" }}
                >
                  Upload Resume (PDF)
                  <input
                    type="file"
                    id="resume"
                    accept="application/pdf"
                    hidden required
                    onChange={(event) => {
                      setFieldValue("resume", event.currentTarget.files[0]);
                    }}
                  />
                </Button>
                <Button
                  variant="contained"
                  component="label"
                  color="primary"
                  sx={{ padding: "10px 20px", fontWeight: "bold", textTransform: "capitalize" }}
                >
                  Upload CV (PDF)
                  <input
                    type="file"
                    id="cv"
                    accept="application/pdf"
                    hidden required
                    onChange={(event) => {
                      setFieldValue("cv", event.currentTarget.files[0]);
                    }}
                  />
                </Button>
              </Box>
            </Box>
            <Box display="flex" justifyContent="center" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                SAVE
              </Button>
            </Box>
            <div id="response"></div>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
  resume: null,
  cv: null,
};

export default Form;
