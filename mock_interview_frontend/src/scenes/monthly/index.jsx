import React from "react";
import { Box } from "@mui/material";
import Header from "components/Header";
import Customers from "./question";
import { useLocation } from 'react-router-dom';
import datas from "../../state/data";

import { useNavigate } from 'react-router-dom';
const QuestionPage = () => {
  const navigate = useNavigate();
  if (datas.getCookie("token") === null || datas.getCookie("token") === undefined) {


    navigate('/loginForm');
  }
  const location = useLocation();
  const questions = location.state?.questions || [];
  const resume = location.state?.resume || [];
  const cv = location.state?.cv || [];


  return (
    <Box m="20px">
      {/* <Header title="Interview" subtitle="Answer the questions below" /> */}
      <Customers questions={questions} score={0} previousQuestion={[]} flag={true} resume={resume} cv={cv} />
    </Box>
  );
};

export default QuestionPage;