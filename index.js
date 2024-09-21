const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const aadharRoutes = require("./routes/aadhar");
const dlRoutes = require("./routes/dl");

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/api", aadharRoutes);
app.use("/api", dlRoutes);

app.get("/*", (req, res) => {
  res.send({ message: "ola! Your site is live" });
});

// Uncomment the following line if you want to run the server locally
// app.listen(process.env.PORT || 7070);

// For serverless deployment
module.exports = app;
