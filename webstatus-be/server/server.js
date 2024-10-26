const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const {startStatusCheckJob} = require("./jobs/checkWebsitesJob.js");
const { router } = require("./routes/routes.js");

//express server
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(router);
app.use(router);
//home route
app.get("/", (req, res) => {
  return res.status(200).send({
    status: 200,
    message: "Welcome to Website Status API",
  });
});

//Start periodic website status check
startStatusCheckJob();
//port definition
const port = process.env.PORT || 8000;
console.log("port", port);
app.listen(port, () => {
  console.log(
    `Web Status API listening on port ${port} in ${process.env.NODE_ENV} mode`
  );
});
module.exports = { app };
