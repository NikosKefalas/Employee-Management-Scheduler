import { useState } from "react";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import TextField from "@mui/material/TextField";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

const UpdateSkill = () => {
  const location = useLocation();
  const title = location.state.title;
  const det = location.state.details;
  const params = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState(det);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const skill = { details };
    const res = await fetch("/api/skills/" + params.id, {
      method: "PATCH",
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
      setError(null);
      navigate("/api/skills/" + params.id);
    }
  };

  return (
    <Container sx={{ marginTop: 3 }}>
      <Typography variant="h5" color="primary" gutterBottom>
        {title}
      </Typography>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          sx={{
            marginTop: 2,
            marginBottom: 2,
            color: "primary",
            display: "block",
          }}
          onChange={(e) => setDetails(e.target.value)}
          value={details}
          label="Details"
          variant="outlined"
          placeholder={details}
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
          Update {title}
        </Button>
      </form>
    </Container>
  );
};

export default UpdateSkill;
