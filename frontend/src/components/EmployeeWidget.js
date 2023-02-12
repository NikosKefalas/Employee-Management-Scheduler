import { Typography, Box, Checkbox, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Colors } from "../styles/theme";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
import EmployeeForm from "./EmployeeForm";

function EmployeeWidget({ toggle }) {
  const [employees, setEmployees] = useState([]);
  const [pickedEmployees, setPickedEmployees] = useState([]);

  useEffect(() => {
    fetch("/api/employees/")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setEmployees(data);
      });
  }, [employees]);

  const handleToggle = (employeeFlag) => {
    if (pickedEmployees.includes(employeeFlag)) {
      setPickedEmployees(pickedEmployees.filter((el) => el !== employeeFlag));
    } else {
      setPickedEmployees(pickedEmployees.concat(employeeFlag));
    }
  };

  const deleteMany = async () => {
    let Ids = Object.assign({});
    Ids = pickedEmployees.map((employee) =>
      Object.assign({}, Ids, { _id: employee._id })
    );
    console.log(Ids);
    const res = await fetch("/api/employees/deletemany", {
      method: "DELETE",
      body: JSON.stringify(Ids),
      headers: { "content-Type": "application/json" },
    });
    const json = await res.json();
    if (res.ok) {
    }
  };

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
      {toggle && (
        <Button sx={{ background: Colors.white }} onClick={deleteMany}>
          Delete Many
        </Button>
      )}
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
          <Box key={employee._id} display={"flex"} flexDirection={"column"}>
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
            {toggle && (
              <Checkbox
                sx={{
                  color: "white",
                  "&.Mui-checked": {
                    color: "white",
                  },
                }}
                onChange={() => handleToggle(employee)}
                value={employee}
                name={employee.name}
                key={employee._id}
              ></Checkbox>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default EmployeeWidget;
