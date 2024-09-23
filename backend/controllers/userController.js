import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//   Login User
const loginUser = async (req, res) => {
  const { email, password } = await req.body;
  try {
    //   Check the user is exists or not in DataBase.
    const user = await userModel.findOne({ email });
    if (!user) {
      res.json({ success: false, message: "User doesn't exists" });
    }

    //   Check the password is Correct or incorrect.
    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      res.json({ success: false, message: "Invalid Credentials" });
    }

    //   create auth token
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//   Create an Auth Token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//    Register User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //  checking is user already exists.
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists." });
    }
    //  Validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please Enter a valid email.",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters.",
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    //  Create the new userSchema using hashedpassword
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedpassword,
    });

    //   saved the newSchema in Database and refrenced it.
    const user = await newUser.save();

    //  create an auth token to give user
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { loginUser, registerUser };
