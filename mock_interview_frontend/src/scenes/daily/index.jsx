import React from "react";
import { Box } from "@mui/material";
import Header from "components/Header";
import Customers from "../monthly/question";
import { useLocation } from 'react-router-dom';
import datas from "../../state/data";

import { useNavigate } from 'react-router-dom';
const QuestionPage = () => {
  const navigate = useNavigate();
  if (datas.getCookie("token") === null || datas.getCookie("token") === undefined) {


    navigate('/loginForm');
  }

  const location = useLocation();

  const currentQuestions = location.state?.currentQuestions || [];
  const questions = location.state?.questions || [];
  const score = location.state?.score;
  const flag = location.state?.flag;
  const resume = location.state?.resume || [];
  const cv = location.state?.cv || [];

  console.log("score is  " + score);
  for (let i of currentQuestions) {
    console.log(i);
  }

  return (
    <Box m="20px">
      {/* <Header title="Interview" subtitle="Answer the questions below" /> */}
      <Customers questions={questions} score={score} previousQuestion={currentQuestions} flag={false} resume={resume} cv={cv} />
    </Box>
  );
};

export default QuestionPage;






































































































// import React, { useMemo, useState } from "react";
// import { Box, useTheme } from "@mui/material";
// import Header from "components/Header";
// import { ResponsiveLine } from "@nivo/line";
// import { useGetSalesQuery } from "state/api";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const Daily = () => {
//   const [startDate, setStartDate] = useState(new Date("2021-02-01"));
//   const [endDate, setEndDate] = useState(new Date("2021-03-01"));
//   const { data } = useGetSalesQuery();
//   const theme = useTheme();

//   const [formattedData] = useMemo(() => {
//     if (!data) return [];

//     const { dailyData } = data;
//     const totalSalesLine = {
//       id: "totalSales",
//       color: theme.palette.secondary.main,
//       data: [],
//     };
//     const totalUnitsLine = {
//       id: "totalUnits",
//       color: theme.palette.secondary[600],
//       data: [],
//     };

//     Object.values(dailyData).forEach(({ date, totalSales, totalUnits }) => {
//       const dateFormatted = new Date(date);
//       if (dateFormatted >= startDate && dateFormatted <= endDate) {
//         const splitDate = date.substring(date.indexOf("-") + 1);

//         totalSalesLine.data = [
//           ...totalSalesLine.data,
//           { x: splitDate, y: totalSales },
//         ];
//         totalUnitsLine.data = [
//           ...totalUnitsLine.data,
//           { x: splitDate, y: totalUnits },
//         ];
//       }
//     });

//     const formattedData = [totalSalesLine, totalUnitsLine];
//     return [formattedData];
//   }, [data, startDate, endDate]); // eslint-disable-line react-hooks/exhaustive-deps

//   return (
//     <Box m="1.5rem 2.5rem">
//       <Header title="DAILY SALES" subtitle="Chart of daily sales" />
//       <Box height="75vh">
//         <Box display="flex" justifyContent="flex-end">
//           <Box>
//             <DatePicker
//               selected={startDate}
//               onChange={(date) => setStartDate(date)}
//               selectsStart
//               startDate={startDate}
//               endDate={endDate}
//             />
//           </Box>
//           <Box>
//             <DatePicker
//               selected={endDate}
//               onChange={(date) => setEndDate(date)}
//               selectsEnd
//               startDate={startDate}
//               endDate={endDate}
//               minDate={startDate}
//             />
//           </Box>
//         </Box>

//         {data ? (
//           <ResponsiveLine
//             data={formattedData}
//             theme={{
//               axis: {
//                 domain: {
//                   line: {
//                     stroke: theme.palette.secondary[200],
//                   },
//                 },
//                 legend: {
//                   text: {
//                     fill: theme.palette.secondary[200],
//                   },
//                 },
//                 ticks: {
//                   line: {
//                     stroke: theme.palette.secondary[200],
//                     strokeWidth: 1,
//                   },
//                   text: {
//                     fill: theme.palette.secondary[200],
//                   },
//                 },
//               },
//               legends: {
//                 text: {
//                   fill: theme.palette.secondary[200],
//                 },
//               },
//               tooltip: {
//                 container: {
//                   color: theme.palette.primary.main,
//                 },
//               },
//             }}
//             colors={{ datum: "color" }}
//             margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
//             xScale={{ type: "point" }}
//             yScale={{
//               type: "linear",
//               min: "auto",
//               max: "auto",
//               stacked: false,
//               reverse: false,
//             }}
//             yFormat=" >-.2f"
//             curve="catmullRom"
//             axisTop={null}
//             axisRight={null}
//             axisBottom={{
//               orient: "bottom",
//               tickSize: 5,
//               tickPadding: 5,
//               tickRotation: 90,
//               legend: "Month",
//               legendOffset: 60,
//               legendPosition: "middle",
//             }}
//             axisLeft={{
//               orient: "left",
//               tickSize: 5,
//               tickPadding: 5,
//               tickRotation: 0,
//               legend: "Total",
//               legendOffset: -50,
//               legendPosition: "middle",
//             }}
//             enableGridX={false}
//             enableGridY={false}
//             pointSize={10}
//             pointColor={{ theme: "background" }}
//             pointBorderWidth={2}
//             pointBorderColor={{ from: "serieColor" }}
//             pointLabelYOffset={-12}
//             useMesh={true}
//             legends={[
//               {
//                 anchor: "top-right",
//                 direction: "column",
//                 justify: false,
//                 translateX: 50,
//                 translateY: 0,
//                 itemsSpacing: 0,
//                 itemDirection: "left-to-right",
//                 itemWidth: 80,
//                 itemHeight: 20,
//                 itemOpacity: 0.75,
//                 symbolSize: 12,
//                 symbolShape: "circle",
//                 symbolBorderColor: "rgba(0, 0, 0, .5)",
//                 effects: [
//                   {
//                     on: "hover",
//                     style: {
//                       itemBackground: "rgba(0, 0, 0, .03)",
//                       itemOpacity: 1,
//                     },
//                   },
//                 ],
//               },
//             ]}
//           />
//         ) : (
//           <>Loading...</>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default Daily;
