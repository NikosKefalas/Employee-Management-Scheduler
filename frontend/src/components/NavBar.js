import { AppBar, Toolbar, Typography, styled, Link, Box } from "@mui/material";
import { Colors } from "../styles/theme";

export const AppbarHeader = styled(Typography)(() => ({
  flexGrow: 1,
  fontSize: "2rem",
}));

function NavBar() {
  return (
    <AppBar position="sticky">
      <Toolbar disableGutters sx={{ padding: "10px", columnGap: "10px" }}>
        <AppbarHeader
          component={Link}
          underline="none"
          color={Colors.white}
          href="/"
        >
          Employee Management
        </AppbarHeader>

        <Link href="/api/skills" underline="none" color={Colors.white}>
          Skills
        </Link>
        <Link href="/api/employees" underline="none" color={Colors.white}>
          Employees
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
