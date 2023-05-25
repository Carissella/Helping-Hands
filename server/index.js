const express = require("express");
const cors = require("cors");
require("dotenv").config();
const databaseConnection = require("./config/databaseConnection");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8080;

//mongodb connection
databaseConnection();

//routes
app.use("/", require("./routes/productRoute"));
app.use("/", require("./routes/userRoute"));

//server is ruuning
app.listen(PORT, () => console.log("server is running at port : " + PORT));
