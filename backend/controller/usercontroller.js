import { User } from "../modules/userschema.js";
import { tempSession } from "../modules/Sessionschema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import verifymail from "../verifymail/verify.js";
import { Otpmail } from "../verifymail/OTPverify.js";

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
        return res.status(401).json({
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
        messege: "user successful registration",
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
/* login the user which is veried and set as logged in the database and created two diifrent token to authenticated even after the weeks letaer*/
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
     return res.status(401).json({
        success: false,
        message: "All feilds are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user note found",
      });
    }
    const comparison = await bcrypt.compare(password, user.password);
    if (!comparison) {
      return res.status(401).json({
        success: false,
        message: "Incorrect Password",
      });
    }

    if (user.isverified !== true) {
     return res.status(404).json({
        success: false,
        message: "Verification needed",
      });
    }

    const accesstoken = jwt.sign({ id: User._id }, process.env.SECRET_KEY, {
      expiresIn: "10d",
    });
    const refreshtoken = jwt.sign({ id: User._id }, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });

    const existingsession = await tempSession.findOne({ userid: user._id });
    if (existingsession) {
      await tempSession.deleteOne({ userid: user._id });
    }
    await tempSession.create({ userid: user._id });

    user.islogged = true;
    user.save();
    return res.status(200).json({
      success: true,
      message: `welcome ${user.username}`,
      accesstoken,
      user,
      refreshtoken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.meassege,
    });
  }
};
// logout function stated to logout the user from the web and setting the islooged to false and detele their all sessions
export const logout = async (req, res) => {
  try {
    const userid = req.UserId;
    await tempSession.findByIdAndDelete(userid);
    await User.findByIdAndUpdate(userid, { islogged: false });
    return res.status(201).json({
      success: true,
      message: "Logout Successfull",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.meassege,
    });
  }
};
// to forget the password directly sent the otp on mail of the registered user and
export const forgetpassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user note found",
    });
  }

  const OTP = Math.floor(100000 + Math.random() * 900000);
  const OTPExpiry = new Date(Date.now() + 10 * 60 * 1000).toString();

  user.otp = OTP;
  user.otpexpiry = OTPExpiry;
  await user.save();

 return res.status(201).json({
    success: true,
    message: "mail sent succesfully",
  });
  await Otpmail({ email: user.email, OTP: OTP });
};
// verify the otp to check entered otp is correct 
export const verifyOTP = async (req, res) => {
  try {
    const { otp, email } = req.body;
    const user = await User.findOne({ email });
    if (!otp) {
      return res.status(401).json({
        success: false,
        message: "Otp needed",
      });
    }

    if (otp !== user.otp) {
      return res.status(401).json({
        success: false,
        message: "Wrong Otp",
      });
    }
    if (Date.now() > user.otpexpiry) {
      return res.status(401).json({ success: false, message: "OTP Expired" });
    }
    user.otp = null;
    user.otpexpiry = null;
    await user.save();
    return res.status(201).json({
      success: true,
      message: "Password change successfull",
    });
  } catch (error) {
   return res.status(500).json({
      success: false,
      message: error.meassege,
    });
  }
};

// change the password directly
export const changepassword = async (req, res) => {
  try {
    const { email, newpassword, confirmpassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (newpassword !== confirmpassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }
    const finalpass = await bcrypt.hash(newpassword, 10);
    user.password = finalpass;
    await user.save();
   return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
   return res.status(500).json({ success: false, message: error.message });
  }
};
