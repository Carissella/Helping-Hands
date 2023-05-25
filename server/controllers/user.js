const userModel = require("../models/User");
const sendToken = require("../utils/jwtToken");

//api login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email, password });
  console.log(user);
  if (!user) {
    return res.status(200).json({
      success: false,
      alert: false,
      user: "Invalid email or password",
    });
  }
  console.log("login");
  sendToken(user, 201, res, "Login is successfully");
};

//sign up
exports.signup = async (req, res) => {
  const { email } = req.body;

  userModel.findOne({ email }, (err, result) => {
    if (result) {
      res.send({ message: "Email id is already register", alert: false });
    } else {
      const data = userModel(req.body);
      data.save();
      res.send({ message: "Successfully sign up", alert: true });
    }
  });
};
