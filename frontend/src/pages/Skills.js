import SkillWidget from "../components/SkillWidget";
import {
  Typography,
  styled,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SkillForm from "../components/SkillForm";

const Skills = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Box
      maxWidth={"100%"}
      padding="2rem 6%"
      gap={"1rem"}
      display={"flex"}
      flexDirection={matches ? "row" : "column"}
      justifyContent="space-between"
    >
      <Box flexBasis="100%">
        <SkillWidget />
      </Box>
      <Box flexBasis="100%">
        <SkillForm />
      </Box>
    </Box>
  );
};

export default Skills;
