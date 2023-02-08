import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { format, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const EmployeeCard = ({ data }) => {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate("/api/employees/update/" + data._id, {
      state: { name: data.name, surname: data.surname },
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
      <div>
        <Container>
          <Card
            sx={{
              width: "100%",
              backgroundColor: "#333",
              borderRadius: 5,
              boxShadow: "0px 0px 5px 2px",
              marginTop: 3,
            }}
          >
            <CardHeader
              title={
                <Typography gutterBottom variant="h6" color={"#887700"}>
                  {data.name} {data.surname}
                  <br /> Age: {data.age}
                </Typography>
              }
              subheader={
                <Typography color={"secondary"} variant="body1">
                  {data.bio}
                </Typography>
              }
            />
            <CardContent>
              {data.setofskills.map((skill) => (
                <Typography>{skill.title}</Typography>
              ))}

              {/* <Typography fontStyle={"italic"} color={"secondary"}>
                {skill.title}
              </Typography> */}
              <Typography fontStyle={"italic"} color={"secondary"}>
                Created At: {format(parseISO(data.createdAt), "MM/dd/yyyy")}
              </Typography>
            </CardContent>
            <Stack direction="row" marginLeft={10}>
              <IconButton aria-label="edit" onClick={handleEdit}>
                <EditOutlinedIcon />
              </IconButton>
              <IconButton aria-label="delete" onClick={handleDelete}>
                <DeleteOutlinedIcon />
              </IconButton>
            </Stack>
          </Card>
        </Container>
      </div>
    );
  }
  return <div></div>;
};

export default EmployeeCard;
