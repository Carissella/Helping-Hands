

const mongoose = require("mongoose");

const databaseConnection = async () => {
  try {
    mongoose.set("strictQuery", false);
    //mongodb connection
    const success = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true, // for warning
      useUnifiedTopology: true, // for warning
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection failed");
  }
};

module.exports = databaseConnection;