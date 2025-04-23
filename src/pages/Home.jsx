import React, { useState } from "react";
import { Box, Button, Typography, Container } from "@mui/material";
import Upload from "../components/Upload";
import Analysis from "../components/Analysis";

const Home = ({ token, setToken }) => {
    const [result, setResult] = useState("");

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            localStorage.removeItem("token");
            setToken(null);
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Box textAlign="center" sx={{ mb: 3 }}>
                <Typography variant="h3" sx={{ fontSize: { xs: "2rem", md: "3rem" } }}>
                    AI Resume Analyzer
                </Typography>
                <Button onClick={handleLogout} variant="contained" color="error" sx={{ mt: 2 }}>
                    Logout
                </Button>
            </Box>

            {/* Upload Component */}
            <Upload token={token} setResult={setResult} />

            {/* Display Analysis Results */}
            <Analysis result={result} />
        </Container>
    );
};

export default Home;
