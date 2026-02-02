import { user } from "../modules/userschema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // Ensure this is imported!
import verifymail from "../verifymail/verify.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. Validation
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // 2. Check existence
    const existinguser = await user.findOne({ email });
    if (existinguser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // 3. Hash the password FIRST
    const hashpassword = await bcrypt.hash(password, 10);

    // 4. Create the user
    const newuser = await user.create({
      email,
      username,
      password: hashpassword, // Make sure your schema field name matches this
    });

    // 5. Generate the token (Fixed JWT syntax)
    const token = jwt.sign(
      { id: newuser._id }, 
      process.env.SECRET_KEY, 
      { expiresIn: "10m" }
    );

    // 6. Send the mail
    await verifymail(token, email);

    // 7. Final Response
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newuser,
    });

  } catch (error) {
    // 8. Crucial: Log the actual error and send a response so the client doesn't hang
    console.error("Registration Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};