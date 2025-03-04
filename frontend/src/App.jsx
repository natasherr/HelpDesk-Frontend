import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";  // Import UserProvider once
import { HelpDeskProvider } from "./context/HelpDeskContext";  // Import HelpDeskProvider once
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Categories from "./pages/Categories";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Problems from "./pages/Problems";
import Faqs from "./pages/Faqs";
import Layout from './components/Layout';
import NoPage from './pages/NoPage';
import Notifications from "./pages/Notifications"; 
import Tag from './pages/Tag';
import { HelpProvider } from './context/HelpContext';
import AddProblem from './pages/AddProblem';
import SingleProblem from './pages/SingleProblem';
import NotiSolution from './pages/NotiSolution';
import TagProblem from './pages/TagProblem';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';



export default function App() {
  return (
    <BrowserRouter>
      {/* Set global dark background for all pages */}
      <div className="bg-gray-900 text-white min-h-screen">
        <UserProvider>
          <HelpDeskProvider>
            <HelpProvider>
              


              <Routes>
                <Route>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="categories" element={<Categories />} />
                    <Route path="problems" element={<Problems />} />
                    <Route path="about" element={<About />} />
                    <Route path="faqs" element={<Faqs />} />
                    <Route path="notifications" element={<Notifications />} />
                    <Route path="/tag/:tagId" element={<Tag />} />
                    <Route path="/tagproblem/:tagId" element={<TagProblem />} />
                    <Route path="/solutions/:notificationId" element={<NotiSolution />} />
                    <Route path="addproblem" element={<AddProblem/>} />
                    <Route path="/singleproblem/:id" element={<SingleProblem/>} />
                    <Route path="forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password/:token" element={<ResetPassword />} />
                    <Route path="*" element={<NoPage />} /> 
                  </Route>
                </Route>
              </Routes>


              
            </HelpProvider>
          </HelpDeskProvider>    
        </UserProvider>
      </div>
    </BrowserRouter>
  );
}
