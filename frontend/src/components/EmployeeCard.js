import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Typography } from "@mui/material";
import { Grid, Avatar, Paper } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { format, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Colors } from "../styles/theme";

const EmployeeCard = ({ data }) => {
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

  if (data.createdAt !== undefined) {
    return (
      <Box
        marginTop={"2rem"}
        justifyContent={"center"}
        display={"flex"}
        flexDirection={"column"}
      >
        <Typography variant="h4" color="primary" textAlign={"center"}>
          Employee Profile Page
        </Typography>
        <Box sx={{ background: Colors.dove_gray }} display={"flex"} flex>
          <Box justifyContent={"center"} alignItems={"center"}>
            <Avatar
              sx={{
                background: Colors.primary,
                height: "4rem",
                width: "4rem",
              }}
            >
              <Typography variant="h4">{data.name[0]}</Typography>
            </Avatar>
            <Box display={"flex"} flexDirection={"column"}>
              <span>{data.address}</span>
              <span>{data.city}</span>
              <span>{data.phone}</span>
              <span>{data.profession}</span>
            </Box>
          </Box>
        </Box>
        hi
      </Box>
    );
  }
  return <div></div>;
};

export default EmployeeCard;
