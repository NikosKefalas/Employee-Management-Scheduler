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
import { useState } from "react";

const Skills = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();
  // const [data, setData] = useState([]);
  const [excel, setExcel] = useState(false);

  const createExcel = () => {
    fetch("/api/skills/excel").then((response) => {
      response.json();
      setExcel(true);
    });
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
        <Button onClick={createExcel} variant="contained" color="success">
          Download Skills in .xlsx format
        </Button>
        {excel && (
          <Typography fontWeight={"bold"}>
            XLSX Created and Stored in Backend Folder!
          </Typography>
        )}
      </Box>
      <Box flexBasis="100%">
        <SkillForm />
      </Box>
    </Box>
  );
};

export default Skills;
