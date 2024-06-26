const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/users");
const applicationRoutes = require("./routes/applications");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/users", userRoutes);
app.use("/", applicationRoutes);

// test
// app.get("/testdb", async (req, res) => {
//   const result = await db.query("SELECT * FROM users LIMIT 1");
//   console.log("result", result);
//   res.status(200).json(result);
// });

// Global error handler:
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

module.exports = app;