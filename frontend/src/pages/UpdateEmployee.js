import { useState } from "react";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import TextField from "@mui/material/TextField";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

const UpdateEmployee = () => {
  const location = useLocation();
  const name = location.state.name;
  const surname = location.state.surname;
  const adr = location.state.address;
  const cit = location.state.city;
  const pho = location.state.phone;
  const prof = location.state.profession;
  const params = useParams();
  const navigate = useNavigate();
  const [address, setAddress] = useState(adr);
  const [city, setCity] = useState(cit);
  const [phone, setPhone] = useState(pho);
  const [profession, setProfession] = useState(prof);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const employee = { address, city, phone, profession };
    const res = await fetch("/api/employees/" + params.id, {
      method: "PATCH",
      body: JSON.stringify(employee),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();

    if (!res.ok) {
      setError(json.error);
    }
    if (res.ok) {
      setCity("");
      setAddress("");
      setPhone("");
      setProfession("");
      setError(null);
      navigate("/api/employees/" + params.id);
    }
  };

  return (
    <Container sx={{ marginTop: 3 }}>
      <Typography variant="h5" color="primary" gutterBottom>
        {name} {surname}
      </Typography>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          sx={{
            marginTop: 2,
            marginBottom: 2,
            color: "primary",
            display: "block",
          }}
          onChange={(e) => setAddress(e.target.value)}
          label="Address"
          value={address}
          variant="outlined"
          placeholder={address}
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
          onChange={(e) => setCity(e.target.value)}
          value={city}
          placeholder={city}
          label="City"
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
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          placeholder={phone}
          label="Phone"
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
          onChange={(e) => setProfession(e.target.value)}
          value={profession}
          placeholder={profession}
          label="Profession"
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
          Update {name}
        </Button>
      </form>
    </Container>
  );
};

export default UpdateEmployee;
