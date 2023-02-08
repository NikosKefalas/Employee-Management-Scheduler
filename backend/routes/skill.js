const express = require("express");
const {
  createSkill,
  getSkills,
  getSkill,
  deleteSkill,
  updateSkill,
  post_many_skill,
} = require("../controllers/skillController");

const router = express.Router();

//get all skils
router.get("/", getSkills);

//get a single skill
router.get("/:id", getSkill);

router.post("/many", post_many_skill);

//create a new skill
router.post("/", createSkill);

//delete a skill
router.delete("/:id", deleteSkill);

//update skill
router.patch("/:id", updateSkill);

module.exports = router;
