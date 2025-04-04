import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import axios from "axios";

const Upload = ({ token, setResult }) => {
    const [resume, setResume] = useState(null);
    const [jobDesc, setJobDesc] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleFileChange = (e) => {
        setResume(e.target.files[0]);
        setError(""); // Clear error on new file selection
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!resume || !jobDesc) {
            setError("Please upload a resume and enter a job description.");
            return;
        }

        const formData = new FormData();
        formData.append("resume", resume);
        formData.append("job_description", jobDesc);

        setLoading(true);
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/analyze-resume/", formData, {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
            });
            setResult(response.data.analysis);
        } catch (error) {
            setError(error.response?.data?.detail || "Error analyzing resume. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box textAlign="center" sx={{ mt: 4 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>Upload Resume</Typography>

            <Paper elevation={3} sx={{ p: 3, mt: 2, maxWidth: 500, mx: "auto" }}>
                {/* File Upload */}
                <input 
                    type="file" 
                    accept="application/pdf" 
                    onChange={handleFileChange} 
                    style={{ display: "block", margin: "10px auto" }} 
                />
                {resume && <Typography variant="body2" sx={{ color: "gray" }}>{resume.name}</Typography>}

                {/* Job Description Input */}
                <TextField
                    multiline
                    rows={4}
                    placeholder="Enter Job Description"
                    value={jobDesc}
                    onChange={(e) => setJobDesc(e.target.value)}
                    fullWidth
                    sx={{ mt: 2 }}
                />

                {/* Error Message */}
                {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}

                {/* Submit Button */}
                <Button 
                    onClick={handleSubmit} 
                    variant="contained" 
                    sx={{ mt: 2, width: "100%" }} 
                    disabled={loading}
                >
                    {loading ? "Analyzing..." : "Analyze Resume"}
                </Button>
            </Paper>
        </Box>
    );
};

export default Upload;
