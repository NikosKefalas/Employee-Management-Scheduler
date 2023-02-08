import { Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Colors } from "../styles/theme";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
import EmployeeForm from "./EmployeeForm";

function EmployeeWidget({ employees }) {
  return (
    <Box
      backgroundColor={Colors.primary}
      display="flex"
      flexDirection={"column"}
      alignItems={"center"}
      padding={"0.2rem"}
    >
      <Typography variant="h5" color={Colors.white} sx={{ mb: "1.5rem" }}>
        Employee List
      </Typography>
      <Box
        display="flex"
        flexDirection={"row"}
        gap="0.5rem"
        flexWrap={"wrap"}
        justifyContent={"center"}
        textAlign={"center"}
        alignItems={"center"}
      >
        {employees.map((employee) => (
          <Box key={employee._id}>
            <Typography
              sx={{ textDecoration: "none" }}
              color={Colors.white}
              component={Link}
              to={"/api/employees/" + employee._id}
              fontSize={"1rem"}
            >
              {employee.name}
              <br></br>
              {employee.surname}
              <br></br>
              {format(parseISO(employee.createdAt), "MM/dd/yyyy")}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default EmployeeWidget;
