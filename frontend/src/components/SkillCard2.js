import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, Typography } from "@mui/material";
import { format, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import CardActions from "@mui/material/CardActions";
import { Colors } from "../styles/theme";
import { useTheme, useMediaQuery } from "@mui/material";

const SkillCard2 = ({ data }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/api/skills/update/" + data._id, {
      state: { title: data.title, details: data.details },
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
      <Box justifyContent={"center"} display="flex" marginTop={"2rem"}>
        <Card
          sx={{
            background: Colors.secondary,
            width: "60%",
            [theme.breakpoints.down("md")]: {
              width: "100%",
            },
          }}
        >
          <CardHeader
            avatar={
              <Avatar sx={{ background: Colors.primary }}>
                {data.title[0]}
              </Avatar>
            }
            title={
              <Typography variant="h5" fontWeight={"bold"} color={Colors.black}>
                {data.title}
              </Typography>
            }
            subheader={
              <Typography variant="h6">
                {format(parseISO(data.createdAt), "MM/dd/yyyy")}
              </Typography>
            }
          />

          <CardContent>
            <Typography variant="caption2" color={Colors.dim_grey}>
              {data.details}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: "center" }}>
            <IconButton
              sx={{ background: Colors.primary, color: Colors.white }}
              onClick={handleDelete}
            >
              <DeleteOutlinedIcon />
            </IconButton>
            <IconButton
              sx={{ background: Colors.primary, color: Colors.white }}
              onClick={handleEdit}
            >
              <EditOutlinedIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Box>
    );
  }
  return <div></div>;
};

export default SkillCard2;
