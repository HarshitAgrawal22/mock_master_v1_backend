import React from "react";
import datas from "../../state/data";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import { useNavigate } from 'react-router-dom';
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
  Margin,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "components/BreakdownChart";
import OverviewChart from "components/OverviewChart";
import { useGetDashboardQuery } from "state/api";
import StatBox from "components/StatBox";

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");




  if (datas.getCookie("token") === null || datas.getCookie("token") === undefined) {

    navigate('/loginForm')
  }




  function wait(seconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, seconds * 1000);
    });
  }


  const handleRowClick = async (params) => {
    const transactionId = params.id;
    // Navigate to the details page with the transaction ID
    console.log("resume =>" + params.row.resume); window.open(datas.MediaBankUrl + params.row.cv, '_blank');
    window.open(datas.MediaBankUrl + params.row.resume, '_blank');
    console.log("cv =>" + params.row.cv);
    await wait(1);

    // navigate(`/transaction/${transactionId}`);
  };







  const { data, isLoading } = useGetDashboardQuery(datas.getCookie("token"));
  console.log(data);
  const columns = [
    {
      field: "_id",
      headerName: "Interview ID",
      flex: 1,
    },
    {
      field: "time",
      headerName: "time",
      flex: 1,
    },
    {
      field: "cv",
      headerName: "CV",
      flex: 1,
    },
    {
      field: "resume",
      headerName: "Resume",
      flex: 1,
    },
    // {
    //   field: "resume",
    //   headerName: "Resume",
    //   flex: 0.5,
    //   sortable: false,
    //   renderCell: (params) => params.value.length,
    // },
    {
      field: "cost",
      headerName: "Score",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    // <Box

    //   display="flex"
    //   justifyContent="center"
    //   alignItems="center"

    // >
    <Box m="1.5rem 2.5rem" >
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        {/* 
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Results

          </Button>
        </Box> */}
      </FlexBetween>

      <Box
        width="100%"
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Total Users"
          value={data && data.totalCustomers}
          // increase="+14%"
          description="Keep Going"
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Total Interview"
          value={data && data.todayStats.totalSales}
          // increase="+21%"
          description="Nice"
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        {/* <Box       //Here we can show the performance of our user in graphical form
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart view="sales" isDashboard={true} /> 
      </Box> */}
        <StatBox
          title="Total score"
          value={data && data.thisMonthStats.totalSales}
          // increase="+5%"
          description="Amazing"
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Last Interview"
          value={data && data.yearlySalesTotal}
          // increase="+43%"
          description="Can Do Better Will Do Best"
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        {/* ROW 2 */}
        <Box               // Here we can show he interview history of the user and ther will be another Tab for it also
          gridColumn="span 8"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={(data && data.transactions) || []}
            columns={columns}
            onRowClick={handleRowClick}
            autoHeight
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
          />
        </Box>
        {/* <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            About Section
          </Typography>
          <BreakdownChart isDashboard={true} />
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Koi bhi bakwas Likhdenge or backend se bhi kkuch aaraha h wo bhi dekhlenge ya hata denge
          </Typography>
        </Box> */}
      </Box>
    </Box >
    // </Box >
  );
};

export default Dashboard;
