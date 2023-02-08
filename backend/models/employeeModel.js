const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const employeeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    setofskills: {
      type: [Object],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);
