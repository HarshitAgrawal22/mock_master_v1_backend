import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
// import './App.css';
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
// import Products from "scenes/products";
import Customers from "scenes/customers";
import Transactions from "scenes/transactions";
import Geography from "scenes/geography";
import Overview from "scenes/overview";
import Daily from "scenes/daily";
import Monthly from "scenes/monthly";
import Breakdown from "scenes/breakdown";
import Admin from "scenes/admin";
import LoadingPage from './components/loadingPage';
import Performance from "scenes/performance";
import Signup from "scenes/signup/Signup";
import LoginForm from "scenes/loginpage/Loginpage";
import interview from "scenes/interview";
function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Navigate to="/LoginForm" replace />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/LoginForm" element={<LoginForm />} />
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              {/* <Route path="/products" element={<Products />} /> */}
              <Route path="/Start-Interview" element={<Geography />} />
              <Route path="/Interview-History" element={<Customers />} />
              {/* <Route path="/Progress" element={<Geography />} /> */}
              <Route path="/Edit-Profile" element={<Overview />} />
              <Route path="/cross-question" element={<Daily />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/loading" element={<LoadingPage />} />
              {/* <Route path="/breakdown" element={<Breakdown />} /> */}
              <Route path="/Feedback" element={<Admin />} />
              <Route path="/result" element={<Performance />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
