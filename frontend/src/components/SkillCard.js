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

const SkillCard = ({ data }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/api/skills/update/" + data._id, {
      state: { title: data.title },
    });
  };

  const handleDelete = async () => {
    const res = await fetch("/api/skills/" + data._id, {
      method: "Delete",
    });
    const json = await res.json();
    if (res.ok) {
      navigate("/api/skills");
    }
  };

  if (data.createdAt !== undefined) {
    return (
      <div>
        <Container>
          <Card
            sx={{
              width: "30%",
              backgroundColor: "#333",
              borderRadius: 5,
              boxShadow: "0px 0px 5px 2px",
              marginTop: 3,
            }}
          >
            <CardHeader
              title={
                <Typography gutterBottom variant="h6" color={"#887700"}>
                  {data.title}
                </Typography>
              }
              subheader={
                <Typography fontStyle={"italic"} color={"secondary"}>
                  Created At: {format(parseISO(data.createdAt), "MM/dd/yyyy")}
                </Typography>
              }
            />
            <CardContent>
              <Typography color={"secondary"} variant="body1">
                {data.details}
              </Typography>
            </CardContent>
            <Stack direction="row" marginLeft={31}>
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

export default SkillCard;
