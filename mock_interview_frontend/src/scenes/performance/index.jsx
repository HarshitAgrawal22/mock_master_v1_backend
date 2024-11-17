import React, { useState } from "react";
import { Box, useTheme, Button, Stack } from "@mui/material";
import Header from "components/Header";
import { Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Formik, FieldArray } from "formik";
import datas from "../../state/data";

import { useNavigate } from 'react-router-dom';

const Breakdown = () => {
  const navigate = useNavigate();
  const location = useLocation();
  if (datas.getCookie("token") === null || datas.getCookie("token") === undefined) {


    navigate('/loginForm');
  }

  console.log("entered to the result page".toUpperCase());

  const currentQuestions = location.state?.questions || [];
  const score = location.state?.score || 0;
  const resume = location.state?.resume;
  const cv = location.state?.cv;

  console.log(currentQuestions);
  console.log(score);
  console.log(resume);
  console.log(cv);




  async function handler() {
    console.log("here we are dhfghdf");



    const responseScore = await fetch(`${datas.url}interview/create-interview`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        token: datas.getCookie("token"),
        score: score,
        resume: resume,
        cv: cv
      })
    });
    const Iresult = await responseScore.json();
    console.log(Iresult);




    for (const question of currentQuestions) {
      console.log("here we are ");
      question.interviewID = Iresult.interview._id;
      if (question.tip !== undefined && question.tip !== null && question.tip !== "") {






        console.log(question);
        const responseScore = await fetch(`${datas.url}question/create-question`, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json; charset=UTF-8"
          },
          body: JSON.stringify(question)
        });
        const result = await responseScore.json();
        console.log(result);







      }

    }






    if (Iresult.status) {
      navigate("/dashboard")
    }
  }




  // const validationSchema = yup.object().shape(
  //   questions.reduce((acc, _, index) => {
  //     acc[`answer${index}`] = yup.string().required("Required");
  //     return acc;
  //   }, {})
  // );

  // const initialValues = questions.reduce((acc, _, index) => {
  //   acc[`answer${index}`] = "";
  //   return acc;
  // }, {});



  return (
    <Box m="1.5rem 2.5rem">
      <Header title={`Score ${score}`} subtitle="Here's Your Current Interview result" />


      <Box justifyContent="end" mt="20px">
        <Button onClick={handler} color="secondary" variant="contained">
          Submit
        </Button>
        <div id="message"></div>
      </Box>
      <Box height="75vh" sx={{
        marginTop: 10
      }}>
        {currentQuestions.map((questionData, index) => (
          <Box
            key={index}
            mb={4}
            sx={{
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // add a light shadow
              border: '1px solid #ddd', // add a light border
              borderRadius: '10px', // add a rounded corner
              padding: '20px', // add some padding
            }}
          >
            <Stack alignItems="left" justifyContent="left" height="auto">
              <Typography
                variant="h5"
                color="#FF0000"
                fontWeight="bold"
                sx={{
                  fontSize: 18,
                  lineHeight: 1.5,
                  letterSpacing: 0.5,
                  marginBottom: 2,
                }}
              >
                Question: {questionData.question}
              </Typography>

              <Typography
                variant="body1"
                color="secondary"
                sx={{
                  fontSize: 16,
                  lineHeight: 1.5,
                  letterSpacing: 0.5,
                  marginBottom: 2,
                }}
              >
                Answer: {questionData.answer}
              </Typography>

              <Typography
                variant="caption"
                color="info"
                sx={{
                  fontSize: 14,
                  lineHeight: 1.5,
                  letterSpacing: 0.5,
                  marginBottom: 2,
                }}
              >
                {questionData.tip}
              </Typography>

              <Typography
                variant="caption"
                color="green"
                sx={{
                  fontSize: 14,
                  lineHeight: 1.5,
                  letterSpacing: 0.5,
                }}
              >
                Score: {questionData.score}
              </Typography>
            </Stack>
          </Box>
        ))}
      </Box>

      <Box sx={{ position: 'absolute', bottom: -50, left: 0, right: 0, textAlign: 'center' }}>
        <Typography
          variant="h3" // increased font size
          color="green" // changed font color to green
          fontWeight="bold"
          sx={{
            fontSize: 20, // increased font size
            lineHeight: 1.5, // added line height
            letterSpacing: 0.5, // added letter spacing
            textShadow: '0px 0px 10px rgba(0, 128, 0, 0.5)', // added text shadow
          }}
        >
          {/* assume score is the variable holding the total score */}
        </Typography>
      </Box>

    </Box>

  );
};


export default Breakdown;
