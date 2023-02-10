import { useState, useEffect } from "react";
import { Typography, Box, Grid, IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import { Colors } from "../styles/theme";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const EmployeeForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [profession, setProfession] = useState("");
  const [setofskills, setSetOfSkills] = useState("");
  const [error, setError] = useState(null);
  const [skills, setSkills] = useState([]);
  const [setofpickedskills, setSetOfPickedSkills] = useState([]);
  const [
    setofpickedskillswithdescription,
    setSetOfPickedSkillsWithDescription,
  ] = useState([]);

  const [formFields, setFormFields] = useState([]);

  useEffect(() => {
    fetch("/api/skills")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setSkills(data);
      });
  }, []);

  const handleToggle = (e) => {
    if (setofpickedskills.includes(e.target.value)) {
      setSetOfPickedSkills(
        setofpickedskills.filter((skills) => skills !== e.target.value)
      );

      setSetOfPickedSkillsWithDescription(
        setofpickedskillswithdescription.filter(
          (skills) => skills.title !== e.target.value
        )
      );
    } else {
      const newSetOfPickedSkills = [...setofpickedskills, e.target.value];
      const newSetOfPickedSkillsWithDescription =
        setofpickedskillswithdescription.concat(
          skills.filter((skill) => skill.title === e.target.value)
        );
      setSetOfPickedSkills(newSetOfPickedSkills);
      setSetOfPickedSkillsWithDescription(newSetOfPickedSkillsWithDescription);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/skills/many", {
      method: "POST",
      body: JSON.stringify(formFields),
      headers: { "content-Type": "application/json" },
    });
    const json2 = await response.json();
    if (!response.ok) {
      setError(json2.error);
    }
    if (response.ok) {
      console.log(json2);
      const skillsToAdd = setofpickedskillswithdescription.concat(json2);

      const employee = {
        name,
        surname,
        address,
        city,
        phone,
        profession,
        setofskills: skillsToAdd,
      };

      const res = await fetch("/api/employees", {
        method: "POST",
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
        setName("");
        setSurname("");
        setAddress("");
        setCity("");
        setPhone("");
        setProfession("");
        setSetOfPickedSkillsWithDescription([]);
        setError(null);
        setFormFields([]);
        e.target.reset();
        setFormFields([]);
        navigate(-1);

        console.log("new employee added", json);
        // window.location.reload();
      }
    }
  };

  // const showSet = () => {
  //   console.log(setofpickedskillswithdescription);
  //   console.log(formFields);
  // };

  // const insertNew = async (e) => {
  //   e.preventDefault();

  //   const response = await fetch("/api/skills/many", {
  //     method: "POST",
  //     body: JSON.stringify(formFields),
  //     headers: { "content-Type": "application/json" },
  //   });
  //   const json2 = await response.json();
  //   if (!response.ok) {
  //     setError(json2.error);
  //   }
  //   if (response.ok) {
  //     console.log(json2);
  //   }
  // };

  const handleChangeInput = (e, index) => {
    const values = [...formFields];
    values[index][e.target.name] = e.target.value;
    setFormFields(values);
  };

  const handleAddInput = () => {
    setFormFields([...formFields, { title: "", details: "" }]);
  };

  const deleteInput = (index) => {
    const values = [...formFields];
    values.splice(index, 1);
    setFormFields(values);
  };

  return (
    <Box>
      <Typography
        marginTop={"1rem"}
        variant="h5"
        color="primary"
        gutterBottom
        align="center"
      >
        Add a New Employee
      </Typography>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Grid container padding={"1rem"} spacing={1} justifyContent={"center"}>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <TextField
              fullWidth
              onChange={(e) => setName(e.target.value)}
              label="Name"
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <TextField
              fullWidth
              onChange={(e) => setSurname(e.target.value)}
              label="Surname"
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <TextField
              fullWidth
              onChange={(e) => setAddress(e.target.value)}
              label="Address"
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <TextField
              fullWidth
              onChange={(e) => setCity(e.target.value)}
              label="City"
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <TextField
              fullWidth
              onChange={(e) => setPhone(e.target.value)}
              label="Phone"
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <TextField
              fullWidth
              onChange={(e) => setProfession(e.target.value)}
              label="Profession"
              variant="outlined"
              required
            />
          </Grid>
          <Grid item width={"300px"}>
            <Button
              fullWidth
              type="submit"
              color="success"
              variant="contained"
              disableElevation
              endIcon={<KeyboardArrowRightIcon />}
            >
              Add Employee
            </Button>
          </Grid>
        </Grid>

        <Typography variant="h5" color="primary" textAlign={"center"}>
          Select Skills
        </Typography>
        <Box
          sx={{ backgroundColor: Colors.primary }}
          flexDirection={"row"}
          display={"flex"}
          padding={"1rem"}
          margin={"1rem"}
          flexWrap={"wrap"}
          color={"white"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {skills.map((skill) => (
            <Box key={skill._id}>
              <Checkbox
                sx={{
                  color: "white",
                  "&.Mui-checked": {
                    color: "white",
                  },
                }}
                onChange={handleToggle}
                id="checkId"
                value={skill.title}
                key={skill._id}
              />
              <label htmlFor={skill._id}>{skill.title}</label>
            </Box>
          ))}
        </Box>
        {/* <Button onClick={showSet}>Show Set</Button> */}
        <Typography variant="h5" textAlign={"center"}>
          Add New Skills
        </Typography>
        <Box
          display={"flex"}
          flexDirection={"row"}
          flexWrap={"wrap"}
          alignItems={"center"}
          marginBottom={"2rem"}
        >
          {formFields.map((formfield, index) => (
            <Box
              key={index}
              display={"flex"}
              flexDirection={"column"}
              gap={"1rem"}
              padding={"1rem"}
            >
              <TextField
                label="Title"
                name="title"
                value={formfield.title}
                onChange={(e) => handleChangeInput(e, index)}
              />
              <TextField
                label="Details"
                name="details"
                value={formfield.details}
                onChange={(e) => handleChangeInput(e, index)}
              />
            </Box>
          ))}

          <Button onClick={handleAddInput} disableElevation>
            <AddIcon />
          </Button>
          <Button onClick={deleteInput} disableElevation>
            <RemoveIcon />
          </Button>

          {/* <Button onClick={insertNew}>Insert New Skills</Button> */}
        </Box>
      </form>
    </Box>
  );
};

export default EmployeeForm;
