import { BrowserRouter, Routes, Route } from "react-router-dom";

//pages and components
import theme from "./styles/theme";
import Home from "./pages/Home";
import Skills from "./pages/Skills";
import Register from "./pages/Register";
import SkillDetails from "./pages/SkillDetails";
import UpdateSkill from "./pages/UpdateSkill";
import { CssBaseline, ThemeProvider } from "@mui/material";
import CreateSkill from "./pages/CreateSkill";
import Employees from "./pages/Employees";
import EmployeeDetails from "./pages/EmployeeDetails";
import UpdateEmployee from "./pages/UpdateEmployee";
import CreateEmployee from "./pages/CreateEmployee";

import NavBar from "./components/NavBar";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/api/skills" element={<Skills />} />
          <Route path="/api/employees" element={<Employees />} />
          <Route path="/api/employees/:id" element={<EmployeeDetails />} />
          <Route
            path="/api/employees/update/:id"
            element={<UpdateEmployee />}
          />
          <Route path="/api/auth/register" element={<Register />} />
          <Route path="/api/skills/:id" element={<SkillDetails />} />
          <Route path="/api/skills/update/:id" element={<UpdateSkill />} />
          <Route path="/api/skills/create" element={<CreateSkill />} />
          <Route path="/api/employees/create" element={<CreateEmployee />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
