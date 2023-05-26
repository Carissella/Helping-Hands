const express = require("express");
const cors = require("cors");
require("dotenv").config();
const databaseConnection = require("./config/databaseConnections.js");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../helping-hands/build')));
  }
  
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../helping-hands/build/index.html'));
  });
//mongodb connection
databaseConnection();

//routes
app.use("/", require("./routes/productRoute"));
app.use("/", require("./routes/userRoute"));

//server is ruuning
app.listen(PORT, () => console.log("server is running at port : " + PORT));
