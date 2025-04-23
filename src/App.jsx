// import "./App.css";
// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import Auth from "./components/Auth";
// import Home from "./pages/Home";
// import jwt_decode from "jwt-decode";

import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { CircularProgress } from "@mui/material"

// Lazy load the Auth and Home components
const Auth = React.lazy(() => import("./components/Auth"));
const Home = React.lazy(() => import("./pages/Home"));


const App = () => {
    const [token, setToken] = useState(localStorage.getItem("token"));

    // Update token state when login/logout happens
    // useEffect(() => {
    //     setToken(localStorage.getItem("token"));

    // }, []);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            try {
                const decoded = jwtDecode(storedToken);
                if (decoded.exp * 1000 < Date.now()) {
                    // Token expired, remove token from localStorage and update state
                    localStorage.removeItem("token");
                    setToken(null);
                } else {
                    setToken(storedToken);
                }
            } catch (e) {
                // Invalid token
                console.error("Invalid token", e);
                localStorage.removeItem("token");
                setToken(null);
            }
        }
    }, []);     // Empty dependency array to run this effect only once on mount


    return (
        <Suspense fallback={<div style={{ textAlign: "center", padding: "50px" }}><CircularProgress /></div>}>
            <Routes>
                {!token ? (
                    <Route path="/" element={<Auth setToken={setToken} />} />
                ) : (
                    <Route path="/" element={<Home token={token} setToken={setToken} />} />
                )}
                {/* Redirect invalid routes */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Suspense>
    );
};

export default App;
