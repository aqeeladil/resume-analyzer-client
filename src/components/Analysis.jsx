import React from "react";
import { Box, Typography, Paper, CircularProgress } from "@mui/material";

const Analysis = ({ result }) => {
    return (
        <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
                Resume Analysis
            </Typography>

            <Paper elevation={3} sx={{ p: 3, mt: 2, maxWidth: 800, mx: "auto" }}>
                {result ? (
                    <Typography variant="body1">{result}</Typography>
                ) : (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px" }}>
                        <Typography variant="body1" sx={{ mr: 2 }}>No analysis available yet.</Typography>
                        <CircularProgress size={24} />
                    </Box>
                )}
            </Paper>
        </Box>
    );
};

export default Analysis;
