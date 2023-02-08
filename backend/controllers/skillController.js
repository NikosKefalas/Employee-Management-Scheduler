const Skill = require("../models/skillModel.js");
const mongoose = require("mongoose");
const Employee = require("../models/employeeModel.js");

//get all skills
const getSkills = async (req, res) => {
  const skill = await Skill.find({});

  res.status(200).json(skill);
};

//get a single skill
const getSkill = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such id" });
  }
  const skill = await Skill.findById(id);

  if (!skill) {
    return res.status(400).json({ error: "No such skill" });
  }
  res.status(200).json(skill);
};

//create a new skill
const createSkill = async (req, res) => {
  const { title, details } = req.body;

  //add skill to db
  if (!(await Skill.findOne({ title: title }))) {
    try {
      const skill = await Skill.create({ title, details });
      res.status(200).json(skill);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else res.status(400).json("This skills already exists!");
};

// const post_many = (req, res) => {
//   Skill.insertMany(req.body.map((skill) => new Skill(skill)))
//     .then((result) => {
//       res.status(200).json(result);
//     })
//     .catch((error) => {
//       res.status(400).json({ error: error.message });
//     });
// };

const post_many_skill = async (req, res) => {
  console.log(req.body);

  req.body.forEach(async (el) => {
    if (!(await Skill.findOne({ title: el.title }))) {
      console.log("mpika sto if");
      console.log(el.title);
      try {
        console.log("eimai sto try");
        const skill = await Skill.create({
          title: el.title,
          details: el.details,
        });
        console.log(skill);
        console.log("egine to skill");
        res.status(200).json(skill);
      } catch (error) {
        console.log("mpika sto catch");
        console.log({ error: error.message });
      }
    } else {
      console.log("mpika sto else");
      res.status(400).json("This skills already exists!");
      next();
    }
  });
};

//delete a skill
const deleteSkill = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such id" });
  }
  const skill = await Skill.findOneAndDelete({ _id: id });
  const employee = await Employee.updateMany({}, { $pull: { skills_id: id } });

  if (!skill) {
    return res.status(400).json({ error: "No such skill" });
  }
  res.status(200).json(skill);
};

//update a skill
const updateSkill = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such id" });
  }
  const skill = await Skill.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!skill) {
    return res.status(400).json({ error: "No such skill" });
  }
  res.status(200).json(skill);
};

module.exports = {
  createSkill,
  getSkills,
  getSkill,
  deleteSkill,
  updateSkill,
  post_many_skill,
};
