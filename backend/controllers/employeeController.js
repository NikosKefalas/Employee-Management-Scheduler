const Employee = require("../models/employeeModel.js");
const mongoose = require("mongoose");
const Skill = require("../models/skillModel.js");

//get all employees

const getEmployees = async (req, res) => {
  if (req.query.name) {
    const employee = await Employee.find({ name: req.query.name });
    res.status(200).json(employee);
  } else {
    const employee = await Employee.find();
    res.status(200).json(employee);
  }
};

//get employee

const getEmployee = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such employee" });
  }
  const employee = await Employee.findById(id);

  if (!employee) {
    return res.status(400).json({ error: "No such employee" });
  }
  res.status(200).json(employee);
};

//create a new employee

const createEmployee = async (req, res) => {
  const newEmployee = req.body;

  //add employee to db
  try {
    const employee = await Employee.create(newEmployee);
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete employee

const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such employee" });
  }
  const employee = await Employee.findOneAndDelete({ _id: id });

  if (!employee) {
    return res.status(400).json({ error: "No such employee" });
  }
  res.status(200).json(employee);
};

//delete many employee

//update employee

const updateEmployee = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such employee" });
  }
  const employee = await Employee.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true }
  );

  if (!employee) {
    return res.status(400).json({ error: "No such employee" });
  }
  res.status(200).json(employee);
};

//add skill to employee
// const addSkill = async (req, res, next) => {
//   const employeeId = req.params.id;
//   const skill = req.body.title;
//   if (!(await Skill.findOne({ title: skill }))) {
//     const newSkill = new Skill(req.body);
//     try {
//       const savedSkill = await newSkill.save();
//       try {
//         await Employee.findByIdAndUpdate(employeeId, {
//           $push: { skills_id: savedSkill._id },
//         });
//       } catch (err) {
//         next(err);
//       }
//       res.status(200).json(savedSkill);
//     } catch (err) {
//       next(err);
//     }
//   } else res.status(400).json("Uparxi idi");
// };

const addSkill = async (req, res, next) => {
  const employeeId = req.params.id;
  const skillId = req.params.skillid;
  const skill = await Skill.findOne({ _id: skillId });
  // console.log(skill);

  try {
    await Employee.findByIdAndUpdate(
      employeeId,
      {
        $push: { setofskills: skill },
      },
      { new: true }
    );
  } catch (err) {
    next(err);
  }
  res.status(200).json(skill);
};

//delete skill from employee

const deleteSkill = async (req, res, next) => {
  console.log(req.params);
  const employeeId = req.params.id;
  const skillid = req.params.skillid;
  // console.log(employeeId);
  // console.log(skillid);

  try {
    const employee = await Employee.findByIdAndUpdate(
      { _id: mongoose.Types.ObjectId(employeeId) },
      {
        $pull: {
          setofskills: {
            $or: [
              { _id: mongoose.Types.ObjectId(skillid) },
              {
                _id: skillid,
              },
            ],
          },
        },
      },
      { new: true }
    );
    res.status(200).json(employee);
  } catch (err) {
    next(err);
  }
};

const deleteMany = async (req, res) => {
  // console.log(req.body);
  const userIds = req.body;
  const employee = await Employee.deleteMany({ _id: { $in: userIds } });
  // console.log(employee);

  if (!employee) {
    return res.status(400).json({ error: "No such employees" });
  }
  res.status(200).json(employee);
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployee,
  deleteEmployee,
  updateEmployee,
  addSkill,
  deleteSkill,
  deleteMany,
};
