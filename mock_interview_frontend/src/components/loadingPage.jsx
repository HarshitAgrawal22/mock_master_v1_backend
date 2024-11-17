import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const LoadingPage = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            flexDirection="column"
        >
            <CircularProgress />
            <Typography variant="h6" sx={{ mt: 2 }}>
                Loading, please wait...
            </Typography>
        </Box>
    );
};

export default LoadingPage;
