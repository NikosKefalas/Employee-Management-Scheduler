import { useState, useEffect } from "react";
import { Typography, Box, Input } from "@mui/material";
import Button from "@mui/material/Button";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";

const EmployeeForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  const [setofskills, setSetOfSkills] = useState("");
  const [error, setError] = useState(null);
  const [skills, setSkills] = useState([]);
  const [setofpickedskills, setSetOfPickedSkills] = useState([]);
  const [
    setofpickedskillswithdescription,
    setSetOfPickedSkillsWithDescription,
  ] = useState([]);

  const [formFields, setFormFields] = useState([
    {
      title: "",
      details: "",
    },
  ]);

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
        age,
        bio,
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
        setAge("");
        setBio("");
        setSetOfPickedSkillsWithDescription([]);
        setError(null);
        setFormFields([]);
        e.target.reset();
        setFormFields([
          {
            title: "",
            details: "",
          },
        ]);

        console.log("new employee added", json);
        // window.location.reload();
      }
    }
  };

  const showSet = () => {
    console.log(setofpickedskillswithdescription);
    console.log(formFields);
  };

  const insertNew = async (e) => {
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
    }
  };

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
    setFormFields(values.splice(index, 1));
  };

  return (
    <Box display={"flex"} flexDirection={"row"}>
      <Box width={"20%"}>
        <Typography variant="h5" color="primary" gutterBottom>
          Add a New Employee
        </Typography>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            sx={{
              marginTop: 2,
              marginBottom: 2,
              color: "primary",
              display: "block",
            }}
            onChange={(e) => setName(e.target.value)}
            label="Name"
            variant="outlined"
            required
          />
          <TextField
            sx={{
              marginTop: 2,
              marginBottom: 2,
              color: "primary",
              display: "block",
            }}
            onChange={(e) => setSurname(e.target.value)}
            label="Surname"
            variant="outlined"
            required
          />
          <TextField
            sx={{
              marginTop: 2,
              marginBottom: 2,
              color: "primary",
              display: "block",
            }}
            onChange={(e) => setAge(e.target.value)}
            label="Age"
            variant="outlined"
            required
          />
          <TextField
            sx={{
              marginTop: 2,
              marginBottom: 2,
              color: "primary",
              display: "block",
            }}
            onChange={(e) => setBio(e.target.value)}
            label="Bio"
            variant="outlined"
            required
          />
          <Button
            type="submit"
            color="success"
            variant="contained"
            disableElevation
            endIcon={<KeyboardArrowRightIcon />}
          >
            Add Employee
          </Button>
        </form>
      </Box>
      <Box flexDirection={"column"} display={"flex"}>
        <Typography variant="h5" color="primary" gutterBottom>
          Select Skills
        </Typography>

        {skills.map((skill) => (
          <div key={skill._id}>
            <Checkbox
              onChange={handleToggle}
              id="checkId"
              value={skill.title}
              key={skill._id}
            />
            <label htmlFor={skill._id}>{skill.title}</label>
          </div>
        ))}
      </Box>
      <Button onClick={showSet}>Show Set</Button>
      <Box>
        <Typography textAlign={"center"}>Add New Skills</Typography>
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
        <Button onClick={handleAddInput}>Add Input</Button>
        <Button onClick={deleteInput}>Delete Input</Button>
        <Button onClick={insertNew}>Insert New Skills</Button>
      </Box>
    </Box>
  );
};

export default EmployeeForm;
