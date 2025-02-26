// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";  // Import UserProvider
import { HelpDeskProvider } from "./context/HelpDeskContext";  // Import HelpDeskProvider
import Home from "./pages/Home";
import Login from "./pages/Login";
import Categories from "./pages/Categories";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import About from "./pages/About";
import Problems from "./pages/Problems";
import Faqs from "./pages/Faqs";
import Layout from './components/Layout';
import NoPage from './pages/NoPage';
import Notifications from "./pages/Notifications"; 
import Tag from './pages/Tag';
import { HelpProvider } from './context/HelpContext';


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
