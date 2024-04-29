import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./components/navbar";
import Blogs from "./pages/blogs";
import BlogsByCategory from "./pages/blogsByCategory";
import BlogDetail from "./pages/blogDetail";
import TestimonialForm from "./pages/testimonialForm";
import Registration from "./pages/registration";
import Login from "./pages/login";
import UserDashboard from "./pages/userDashboard";
import Footer from "./components/footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserPrescription from "./pages/userPrescription";
import UserNewAppointment from "./pages/userNewAppointment";
import SettingsView from "./pages/settingsView";
import { AuthProvider } from "./auth/AuthContext";
import PrivateRoute from "./auth/PrivateRoute";

function FooterWrapper() {
  const location = useLocation();
  const hideFooter = location.pathname.includes("/user");

  return <>{!hideFooter && <Footer />}</>;
}

function App() {
  return (
    <Router>
      <AuthProvider>
      <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/category/:id" element={<BlogsByCategory />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/feedback" element={<PrivateRoute element={<TestimonialForm />} path={"/testimonial"} />}  />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/dashboard" element={<PrivateRoute element={<UserDashboard />} path={"/user/dashboard"} />} />
          <Route path="/user/dashboard/prescription/:id" element={<PrivateRoute element={<UserPrescription />} path={"/user/dashboard/prescription"} />} />
          <Route path="/user/dashboard/create-appointment" element={<PrivateRoute element={<UserNewAppointment />} path={"/user/dashboard/create-appointment"} />} />
          <Route path="/user/settings" element={<PrivateRoute element={<SettingsView />} path={"/user/settings"} />} />
        </Routes>
      <FooterWrapper />
      </AuthProvider>
      
    </Router>
  );
}

export default App;
