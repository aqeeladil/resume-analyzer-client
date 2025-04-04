import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Auth from "./components/Auth";
import Home from "./pages/Home";



const App = () => {
    const [token, setToken] = useState(localStorage.getItem("token"));

    // Update token state when login/logout happens
    useEffect(() => {
        setToken(localStorage.getItem("token"));

    }, []);

    return (
        
          <Routes>
              {!token ? (
                  <Route path="/" element={<Auth setToken={setToken} />} />
              ) : (
                  <Route path="/" element={<Home token={token} setToken={setToken} />} />
              )}
              {/* Redirect invalid routes */}
              <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        
    );
};

export default App;
