import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;;

// User Registration
export const registerUser = async (userData) => {
    try {
        return await axios.post(`${API_URL}register/`, userData);
    } catch (error) {
        throw error.response?.data || "Registration failed";
    }
};

// User Login
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}login/`, credentials);
        localStorage.setItem("token", response.data.access); // Save token on login
        return response.data;
    } catch (error) {
        throw error.response?.data || "Login failed";
    }
};

// Resume Analysis
export const analyzeResume = async (token, formData) => {
    try {
        const response = await axios.post(`${API_URL}analyze-resume/`, formData, {
            headers: { 
                Authorization: `Bearer ${token}`, 
                "Content-Type": "multipart/form-data" 
            },
        });
        return response.data.analysis;
    } catch (error) {
        throw error.response?.data || "Resume analysis failed";
    }
};
