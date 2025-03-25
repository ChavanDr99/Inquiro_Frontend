import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import { ContextProvider } from "./Components/Context";
import Login from "./Components/Login/Login";
import Signup from "./Components/Login/Signup";
import DashboardLayout from "./Components/User_DashBoard/Dashboard_Layout";
import Dashboard from "./Components/User_DashBoard/Dashboard.jsx";
import ManageProfile from "./Components/User_DashBoard/Manage.jsx";

export function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="/Dash" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="manage" element={<ManageProfile />} />
      </Route>
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}
