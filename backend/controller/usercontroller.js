import { User } from "../modules/userschema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import verifymail from "../verifymail/verify.js";

/* registration handle the user data and also collect the data =of username,email,password. so it can add the only original data ,not the fake one . by sending the verification mail with token and also hashed the password using the bcrypt property for the secure password and generating the uniqe token for the user*/

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const newuser = await User.create({
      email,
      username,
      password: hashpassword,
    });
    const token = jwt.sign({ id: newuser._id }, process.env.SECRET_KEY, {
      expiresIn: "10m",
    });

    await verifymail(token, email);

    return res.status(201).json({
      success: true,
      token,
      message: "User created successfully",
      data: newuser,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
/*
worked as a gateway for the original user that user click on the link sent on the gmail then it return the isverfied to true and let the user access there data 
*/

export const verifiction = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({
        success: false,
        message: "credentials are not avialable",
      });
    }
    const token = authHeader.split(" ")[1];
    let decoded;
    decoded = jwt.verify(token, process.env.SECRET_KEY);
    try {
      const user = await User.findById(decoded.id);
      if (!user) {
        res.status(401).json({
          success: false,
          message: "user not found",
        });
      }

      if (user.isverified) {
        return res.status(400).json({
          success: false,
          message: "User is already verified",
        });
      }

      user.token = null;
      user.isverified = true;
      await user.save();

      return res.status(200).json({
        success: true,
        meassege: "user successful registration",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "cant find your data",
      });
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(400).json({
        success: false,
        message: "the registration token expired",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Server error during verification",
    });
  }
};

export const login = async (req, res) => {
  try {
    if (isverified) {
      const passwordcompare = bcrypt.compare()
    }
  } catch (error) {}
};
