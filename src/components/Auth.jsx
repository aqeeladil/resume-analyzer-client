import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { registerUser, loginUser } from "../api";

const Auth = ({ setToken }) => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!formData.username || !formData.password) {
            setError("Username and password are required.");
            return;
        }

        setLoading(true);
        try {
            const response = isLogin ? await loginUser(formData) : await registerUser(formData);
            if (isLogin) {
                localStorage.setItem("token", response.access);
                setToken(response.access);

            }
            alert(isLogin ? "Login Successful" : "Registration Successful");
        } catch (err) {
            const defaultMessage = isLogin
                ? "Login failed. Please check your username and password."
                : "Registration failed. Please try again with a different username.";
            
            setError(err.response?.data?.detail || defaultMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box textAlign="center" sx={{ mt: 6 }}>
            <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: "auto" }}>
                <Typography variant="h4" sx={{ mb: 2 }}>
                    {isLogin ? "Login" : "Register"}
                </Typography>

                {error && <Typography color="error">{error}</Typography>}

                <TextField 
                    name="username" 
                    label="Username" 
                    value={formData.username} 
                    onChange={handleChange} 
                    fullWidth 
                    sx={{ mb: 2 }}
                />
                <TextField 
                    name="password" 
                    type="password" 
                    label="Password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    fullWidth 
                    sx={{ mb: 2 }}
                />
                <Button onClick={handleSubmit} variant="contained" fullWidth disabled={loading}>
                    {loading ? "Processing..." : isLogin ? "Login" : "Register"}
                </Button>

                <Typography 
                    onClick={() => setIsLogin(!isLogin)} 
                    sx={{ mt: 2, cursor: "pointer", color: "blue" }}
                >
                    {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
                </Typography>
            </Paper>
        </Box>
    );
};

export default Auth;
