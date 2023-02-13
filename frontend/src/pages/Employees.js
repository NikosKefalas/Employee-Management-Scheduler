import { useEffect, useState } from "react";
import {
  Box,
  Input,
  useMediaQuery,
  useTheme,
  TextField,
  Typography,
  Checkbox,
} from "@mui/material";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import SortIcon from "@mui/icons-material/Sort";
import EmployeeWidget from "../components/EmployeeWidget.js";
import { Colors } from "../styles/theme/index.js";
import { useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";

const Employees = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [employees, setEmployees] = useState([]);
  const [sorted, setSorted] = useState("ASC");
  const [sortDate, setSortDate] = useState("ASC");
  const [searchPhrase, setSearchPhrase] = useState("");
  const [searchPhraseSkill, setSearchPhraseSkill] = useState("");
  const [toggle, setToggle] = useState(false);

  const [pickedEmployees, setPickedEmployees] = useState([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  console.log(toggle);

  useEffect(() => {
    fetch("/api/employees")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.sort((a, b) => a.surname.localeCompare(b.surname));
        setEmployees(data);
        setData(data);
        setSorted("DSC");
      });
  }, []);

  const handleSorting = () => {
    if (sorted === "ASC") {
      const employeesCopy = [...employees].sort((a, b) =>
        a.surname.localeCompare(b.surname)
      );
      setEmployees(employeesCopy);
      setSorted("DSC");
    }
    if (sorted === "DSC") {
      const employeesCopy = [...employees].sort((a, b) =>
        b.surname.localeCompare(a.surname)
      );
      setEmployees(employeesCopy);
      setSorted("ASC");
    }
  };

  const handleSortDate = () => {
    if (sortDate === "ASC") {
      const employeesCopy = [...employees].sort((a, b) =>
        a.createdAt.localeCompare(b.createdAt)
      );
      setEmployees(employeesCopy);
      setSortDate("DSC");
    }
    if (sortDate === "DSC") {
      const employeesCopy = [...employees].sort((a, b) =>
        b.createdAt.localeCompare(a.createdAt)
      );
      setEmployees(employeesCopy);
      setSortDate("ASC");
    }
  };

  const search = (e) => {
    const matchedEmployees = data.filter((employee) => {
      return `${employee.name} ${employee.surname}`
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });

    setEmployees(matchedEmployees);
    setSearchPhrase(e.target.value);
  };
  const handleCreate = () => {
    navigate("/api/employees/create");
  };

  const searchSkill = (e) => {
    if (e.target.value === "") {
      setEmployees(data);
      setSearchPhraseSkill(e.target.value);
    } else {
      const matched = data.filter((employee) => {
        // console.log(employee.name);
        let flag = false;
        employee.setofskills.forEach((skill) => {
          // console.log(skill.title);
          // console.log("-------------");
          if (
            `${skill.title}`.toLowerCase() === `${e.target.value}`.toLowerCase()
          ) {
            // console.log("Vrethike------");
            // console.log(employee.name);
            // console.log(skill.title);
            flag = true;
          }
        });
        return flag;
      });
      setEmployees(matched);
      setSearchPhraseSkill(e.target.value);
    }
  };

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
      fetch("/api/employees")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          data.sort((a, b) => a.surname.localeCompare(b.surname));
          setEmployees(data);
          setData(data);
          setSorted("DSC");
        });
    }
  };

  return (
    <Box
      maxWidth={matches ? "100%" : "100%"}
      paddingX={!matches ? "1rem" : "5rem"}
      marginTop={"1rem"}
      display={"flex"}
      gap={"1rem"}
      flexDirection={matches ? "column" : "column"}
    >
      <Box
        display={"flex"}
        flexDirection={!matches ? "column" : "row"}
        gap={"1rem"}
      >
        <Input
          type="text"
          placeholder="Search by name/surname"
          value={searchPhrase}
          onChange={search}
        />
        <Input
          type="text"
          placeholder="Search by skills"
          value={searchPhraseSkill}
          onChange={searchSkill}
        />
        <Button disableElevation onClick={handleSorting} variant="contained">
          <SortIcon />
          Sort By Surname
        </Button>
        <Button disableElevation onClick={handleSortDate} variant="contained">
          <SortIcon />
          Sort By date
        </Button>
        <Button
          variant="contained"
          onClick={handleCreate}
          disableElevation
          color="success"
        >
          <SortIcon />
          New Employee
        </Button>
        <Button
          variant="contained"
          disableElevation
          sx={{
            backgroundColor:
              toggle === true ? Colors.dim_grey : Colors.dove_gray,
          }}
          onClick={() => setToggle(!toggle)}
        >
          Toggle Delete
        </Button>
      </Box>
      <Box>
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
      </Box>
    </Box>
  );
};

export default Employees;
