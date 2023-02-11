import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Button, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Avatar, styled } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { format, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Colors } from "../styles/theme";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PhoneIcon from "@mui/icons-material/Phone";
import WorkIcon from "@mui/icons-material/Work";
import { useState, useEffect } from "react";

const EmployeeCard = ({ id }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const [data, setData] = useState([]);
  const [allSkills, setAllSkills] = useState([]);

  useEffect(() => {
    fetch("/api/employees/" + id)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
      });
  }, [data]);

  useEffect(() => {
    fetch("/api/skills/")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAllSkills(data);
      });
  }, [allSkills]);

  const Wrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    padding: "1.5rem 1.5rem 0.75rem 1.5rem",
    backgroundColor: Colors.dove_gray,
  }));

  const navigate = useNavigate();
  const handleEdit = () => {
    navigate("/api/employees/update/" + data._id, {
      state: {
        name: data.name,
        surname: data.surname,
        address: data.address,
        phone: data.phone,
        city: data.city,
        profession: data.profession,
      },
    });
  };

  const handleDelete = async () => {
    const res = await fetch("/api/employees/" + data._id, {
      method: "Delete",
    });
    const json = await res.json();
    if (res.ok) {
      navigate("/api/employees");
    }
  };

  const deleteSkill = async (skill) => {
    // console.log(data._id);
    // console.log(skill);
    const res = await fetch("/api/employees/delete/" + data._id + "/" + skill, {
      method: "POST",
    });
    const json = await res.json();
    if (res.ok) {
    }
  };

  const addSkill = async (skill) => {
    const res = await fetch("/api/employees/add/" + data._id + "/" + skill, {
      method: "POST",
    });
    const json = await res.json();
    if (res.ok) {
    }
  };

  if (data.createdAt !== undefined) {
    return (
      <Box>
        <Wrapper justifyContent={"center"} alignItems={"center"}>
          <Typography variant="h5" textAlign="center">
            Emplooyee Profile Page
          </Typography>
          <Box marginTop={"2rem"} display={"flex"} flexDirection={"row"}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Avatar
                sx={{ width: "5rem", height: "5rem", background: Colors.dark }}
              >
                <Typography variant="h4">{data.name[0]}</Typography>
              </Avatar>
              <Typography variant="h6">
                {data.name} {data.surname}
              </Typography>
            </Box>
            <Box paddingLeft={"2rem"} display={"flex"} flexDirection={"column"}>
              <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
                <HomeIcon></HomeIcon>
                <Typography sx={{ paddingLeft: "0.5rem" }}>
                  {data.address}
                </Typography>
              </Box>
              <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
                <LocationCityIcon />
                <Typography sx={{ paddingLeft: "0.5rem" }}>
                  {data.city}
                </Typography>
              </Box>
              <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
                <PhoneIcon />
                <Typography sx={{ paddingLeft: "0.5rem" }}>
                  {data.phone}
                </Typography>
              </Box>
              <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
                <WorkIcon />
                <Typography sx={{ paddingLeft: "0.5rem" }}>
                  {data.profession}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Wrapper>
        <Box
          display={"flex"}
          flexDirection={matches ? "row" : "column"}
          justifyContent={matches ? "space-between" : "center"}
          margin={matches ? "0" : "1rem"}
        >
          <Box
            sx={{ background: Colors.dim_grey }}
            display={"flex"}
            flexDirection={"column"}
            flexBasis={"30%"}
            borderRadius={"2rem"}
            justifyContent={"center"}
            paddingX={"2rem"}
            marginLeft={matches ? "4rem" : "0"}
          >
            <Typography variant="h5" textAlign={"center"}>
              Aquired Skills
            </Typography>
            {data.setofskills.map((skill) => (
              <Box
                key={skill._id}
                display={"flex"}
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography>{skill.title}</Typography>
                <Button onClick={() => deleteSkill(skill._id)}>
                  <RemoveIcon />
                </Button>
              </Box>
            ))}
          </Box>
          <Box
            sx={{ background: Colors.light }}
            display={"flex"}
            flexDirection={"column"}
            flexBasis={"30%"}
            borderRadius={"2rem"}
            justifyContent={"center"}
            paddingX={"2rem"}
            marginRight={matches ? "4rem" : "0"}
          >
            <Typography variant="h5" textAlign={"center"}>
              Aquired Skills
            </Typography>
            {allSkills
              .filter((x) => !data.setofskills.some((y) => x._id === y._id))
              .map((skill) => (
                <Box
                  key={skill._id}
                  display={"flex"}
                  flexDirection={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Typography>{skill.title}</Typography>
                  <Button onClick={() => addSkill(skill._id)}>
                    <AddIcon />
                  </Button>
                </Box>
              ))}
          </Box>
        </Box>
      </Box>
    );
  }
  return <div></div>;
};

export default EmployeeCard;
