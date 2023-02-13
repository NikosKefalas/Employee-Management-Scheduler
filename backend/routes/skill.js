const express = require("express");
const {
  createSkill,
  getSkills,
  getSkill,
  deleteSkill,
  updateSkill,
  post_many,
  createExcel,
} = require("../controllers/skillController");

const router = express.Router();

router.get("/", getSkills);

router.get("/excel", createExcel);

router.get("/:id", getSkill);

router.post("/many", post_many);

router.post("/", createSkill);

router.delete("/:id", deleteSkill);

router.patch("/:id", updateSkill);

module.exports = router;
