const Skill = require("../models/skillModel.js");
const mongoose = require("mongoose");
const Employee = require("../models/employeeModel.js");
const XLSX = require("xlsx");
const { find } = require("../models/skillModel.js");
const { json } = require("body-parser");

const getSkills = async (req, res, next) => {
  const skill = await Skill.find({});

  res.status(200).json(skill);
};

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

const createExcel = async (req, res) => {
  const skill = await Skill.find({}, " _id title details").lean();
  const obj = JSON.parse(JSON.stringify(skill));

  const workSheet = XLSX.utils.json_to_sheet(obj, { skipHeader: false });
  const workBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workBook, workSheet, "skills");
  XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
  XLSX.write(workBook, { bookType: "xlsx", type: "binary" });

  XLSX.writeFile(workBook, "skillsData.xlsx");
  res.status(200).json(obj);
};

const post_many = (req, res) => {
  Skill.insertMany(req.body.map((skill) => new Skill(skill)))
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

const deleteSkill = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such id" });
  }
  const skill = await Skill.findOneAndDelete({ _id: id });
  const employee = await Employee.updateMany(
    {},
    { $pull: { setofskills: id } }
  );

  if (!skill) {
    return res.status(400).json({ error: "No such skill" });
  }
  res.status(200).json(skill);
};

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
  post_many,
  createExcel,
};
