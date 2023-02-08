const express = require("express");
const {
  deleteSkill,
  addSkill,
  createEmployee,
  getEmployee,
  getEmployees,
  deleteEmployee,
  updateEmployee,
} = require("../controllers/employeeController");

const router = express.Router();

//get all employees
router.get("/", getEmployees);

//add skill  to employee and also to skill list
router.post("/:id", addSkill);

//delete skill from employee
router.post("/:id/:skillid", deleteSkill);

//get a single employee
router.get("/:id", getEmployee);

//create a new employee
router.post("/", createEmployee);

//delete a employee
router.delete("/:id", deleteEmployee);

//update employee
router.patch("/:id", updateEmployee);

module.exports = router;
