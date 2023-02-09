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
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },

    profession: {
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
