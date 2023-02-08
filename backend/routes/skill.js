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

//get all skils
router.get("/", getSkills);

router.get("/excel", createExcel);

//get a single skill
router.get("/:id", getSkill);

//post many skills
router.post("/many", post_many);

//export Excel

//create a new skill
router.post("/", createSkill);

//delete a skill
router.delete("/:id", deleteSkill);

//update skill
router.patch("/:id", updateSkill);

module.exports = router;
