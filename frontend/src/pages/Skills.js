import SkillWidget from "../components/SkillWidget";
import {
  Typography,
  styled,
  Box,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import SkillForm from "../components/SkillForm";
import { useNavigate } from "react-router-dom";

const Skills = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();

  const createExcel = () => {
    navigate("/api/skills/excel");
  };

  return (
    <Box
      maxWidth={"100%"}
      padding="2rem 6%"
      gap={"1rem"}
      display={"flex"}
      flexDirection={matches ? "row" : "column"}
      justifyContent="space-between"
    >
      <Box
        flexBasis="100%"
        display={"flex"}
        flexDirection={"column"}
        gap={"1rem"}
      >
        <SkillWidget />
        <Button
          onClick={createExcel}
          href="/api/skills"
          variant="contained"
          color="success"
        >
          Download Skills in .xlsx format
        </Button>
      </Box>
      <Box flexBasis="100%">
        <SkillForm />
      </Box>
    </Box>
  );
};

export default Skills;
