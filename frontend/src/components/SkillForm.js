import { useState } from "react";

import Button from "@mui/material/Button";
import { Typography, styled, Box, Container } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { WidgetWrapper } from "./SkillWidget";

const SkillForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const skill = { title, details };
    const res = await fetch("/api/skills", {
      method: "POST",
      body: JSON.stringify(skill),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();

    if (!res.ok) {
      setError(json.error);
    }
    if (res.ok) {
      setDetails("");
      setTitle("");
      setError(null);
      e.target.reset();
      console.log("new skill added", json);
      // window.location.reload();
    }
  };

  return (
    <Box display={"flex"} flexDirection={"column"} justifyContent={"center"}>
      <Typography
        textAlign={"center"}
        variant="h5"
        color="primary"
        gutterBottom
      >
        Create a New Skill
      </Typography>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          sx={{
            marginTop: 2,
            marginBottom: 2,
            color: "primary",
            display: "block",
          }}
          onChange={(e) => setTitle(e.target.value)}
          label="Title"
          variant="outlined"
          required
          fullWidth
        />
        <TextField
          sx={{
            marginTop: 2,
            marginBottom: 2,
            color: "primary",
            display: "block",
          }}
          onChange={(e) => setDetails(e.target.value)}
          label="Details"
          variant="outlined"
          required
          fullWidth
        />
        <Button
          type="submit"
          color="success"
          variant="contained"
          disableElevation
          endIcon={<KeyboardArrowRightIcon />}
        >
          Add Skill
        </Button>
      </form>
    </Box>
  );
};

export default SkillForm;
