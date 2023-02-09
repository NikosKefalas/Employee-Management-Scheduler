import { Typography, styled, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Colors } from "../styles/theme";
import { Link } from "react-router-dom";

export const WidgetWrapper = styled(Box)(({ theme }) => ({
  display: "inline-block",
  padding: "1.5rem 1.5rem 0.75rem 1.5rem",
  backgroundColor: Colors.primary,
  borderRadius: "0.75rem",
}));

function SkillWidget() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch("/api/skills")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setSkills(data);
      });
  }, [skills]);
  return (
    <WidgetWrapper>
      <Typography
        variant="h5"
        color={Colors.white}
        sx={{ mb: "1.5rem" }}
        textAlign="center"
      >
        Skill List
      </Typography>
      <Box
        justifyContent={"center"}
        alignItems={"center"}
        display="flex"
        flexDirection={"row"}
        gap="1rem"
        flexWrap={"wrap"}
      >
        {skills.map((skill) => (
          <Box key={skill._id}>
            <Typography
              sx={{ textDecoration: "none" }}
              color={Colors.white}
              component={Link}
              to={"/api/skills/" + skill._id}
              fontSize={"1rem"}
            >
              {skill.title}
            </Typography>
          </Box>
        ))}
      </Box>
    </WidgetWrapper>
  );
}

export default SkillWidget;
