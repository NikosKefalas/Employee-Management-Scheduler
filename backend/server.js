const express = require("express");
require("dotenv").config();
const skillRoutes = require("./routes/skill");
const employeeRoutes = require("./routes/employee");
const morgan = require("morgan");
const fs = require("fs");
const mongoose = require("mongoose");

// starting express app
const app = express();
mongoose.set("strictQuery", true);

// middleware to keep logs
app.use(
  morgan("common", {
    stream: fs.createWriteStream("./historyLogs", { flags: "a" }),
  })
);

app.use(express.json()); //gives acces to request body

// routes
app.use("/api/skills", skillRoutes);
app.use("/api/employees", employeeRoutes);

//error handling middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json(errorMessage);
});

//connect to db and setting up a port to listen
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connected to db and listening on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
