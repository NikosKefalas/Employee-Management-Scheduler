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

router.get("/", getEmployees);

router.post("/add/:id/:skillid", addSkill);

router.post("/:id/:skillid", deleteSkill);

router.delete("/deletemany", deleteMany);

router.get("/:id", getEmployee);

router.post("/", createEmployee);

router.delete("/:id", deleteEmployee);

router.patch("/:id", updateEmployee);

module.exports = router;
