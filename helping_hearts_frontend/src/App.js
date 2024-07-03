import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Navbars from "./components/Navbars";
import HHDashBoard from "./pages/HHUsers/HHDashBoard";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import OldAgeHomeList from "./pages/OldAgeHomeList";
import OrphanageList from "./pages/OrphanageList";
import RegisterOrphanage from "./pages/RegisterOrphanage";
import Signup from "./pages/Signup";
import AdminPanel from "./pages/admin/AdminPanel";
import ViewOrganizations from "./pages/admin/organization/ViewOrganizations";
import DonationForm from "./pages/users/DonationForm";
import IndividualPage from "./pages/users/IndividualPage";
import Profile from "./pages/users/Profile";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user?.isAdmin, user);
  return (
    <Router>
      <ToastContainer />
      {user?.isAdmin || user?.isOrganization ? null : <Navbars />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/donation-form" element={<DonationForm />} />
        <Route path="/orphanage-form" element={<RegisterOrphanage />} />
        <Route path="/single-organization/:id" element={<IndividualPage />} />
        <Route path="/orphanage-list" element={<OrphanageList />} />
        <Route path="/home-list" element={<OldAgeHomeList />} />

        {/* admin part */}
        <Route path="/orgs-list" element={<ViewOrganizations />} />
        <Route path="/admin-dashboard" element={<AdminPanel />} />

        {/* helpingheartsparts */}
        <Route path="/hh/dashboard" element={<AdminPanel />} />
      </Routes>

      {user?.isAdmin || user?.isOrganization ? null : <Footer />}
    </Router>
  );
}

export default App;
