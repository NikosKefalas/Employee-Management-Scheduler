const express = require("express");
const {
  deleteSkill,
  addSkill,
  createEmployee,
  getEmployee,
  getEmployees,
  deleteEmployee,
  updateEmployee,
  deleteMany,
} = require("../controllers/employeeController");

const router = express.Router();

//get all employees
router.get("/", getEmployees);

//add skill  to employee and also to skill list
router.post("/add/:id/:skillid", addSkill);

//delete skill from employee
router.post("/:id/:skillid", deleteSkill);

//Delete multiple Employees
router.delete("/deletemany", deleteMany);

//get a single employee
router.get("/:id", getEmployee);

//create a new employee
router.post("/", createEmployee);

//delete a employee
router.delete("/:id", deleteEmployee);

//update employee
router.patch("/:id", updateEmployee);

module.exports = router;
