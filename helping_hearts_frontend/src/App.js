import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Navbars from "./components/Navbars";

function App() {
  // const user = JSON.parse(localStorage.getItem("user"));
  return (
    <Router>
      
      <Navbars />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
