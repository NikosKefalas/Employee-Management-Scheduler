import SkillWidget from "../components/SkillWidget";
import {
  Typography,
  styled,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SkillForm from "../components/SkillForm";

const Home = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  return <div>Hi this is the home page</div>;
};

export default Home;
