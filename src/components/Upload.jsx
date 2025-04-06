import React, { useState } from "react";
import {
    TextField,
    Button,
    Box,
    Typography,
    Paper,
    CircularProgress,
    Alert,
} from "@mui/material";
import { analyzeResume } from "../api"; // Make sure this API function is correctly implemented

const Upload = ({ token, setResult }) => {
    const [resume, setResume] = useState(null);
    const [jobDesc, setJobDesc] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleFileChange = (e) => {
        setResume(e.target.files[0]);
        setError("");
        setSuccess("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!resume || !jobDesc) {
            setError("Please upload a resume and enter a job description.");
            return;
        }

        const formData = new FormData();
        formData.append("resume", resume);
        formData.append("job_description", jobDesc);

        setLoading(true);
        try {
            const analysis = await analyzeResume(token, formData); // Assuming this returns the backend result
            // Ensure you extract the data correctly from the response
            const { analysis: result } = analysis;  // Get the analysis field or adjust based on your backend response
            setResult(result); // Pass just the analysis result
            setSuccess("Resume analyzed successfully.");
            setResume(null);
            setJobDesc("");
        } catch (error) {
            const message =
                error.response?.data?.detail ||
                "Failed to analyze the resume. Please ensure the file is a PDF and try again.";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box textAlign="center" sx={{ mt: 4 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>Upload Resume</Typography>

            <Paper elevation={3} sx={{ p: 3, mt: 2, maxWidth: 500, mx: "auto" }}>
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    style={{ display: "block", margin: "10px auto" }}
                />
                {resume && <Typography variant="body2" sx={{ color: "gray" }}>{resume.name}</Typography>}

                <TextField
                    multiline
                    rows={4}
                    placeholder="Enter Job Description"
                    value={jobDesc}
                    onChange={(e) => setJobDesc(e.target.value)}
                    fullWidth
                    sx={{ mt: 2 }}
                />

                {/* Error or Success Alerts */}
                {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}

                <Box sx={{ mt: 3 }}>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        sx={{ width: "100%" }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : "Analyze Resume"}
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default Upload;
