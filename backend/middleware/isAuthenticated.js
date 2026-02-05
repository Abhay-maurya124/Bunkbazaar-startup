import jwt from "jsonwebtoken";
import { User } from "../modules/userschema.js";

export const isAuthentication = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 1. Check if header exists
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({
        success: false,
        message: "Access token is missing or invalid",
      });
    }

    const token = authHeader.split(" ")[1];

    // 2. Verify Token
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        const message = err.name === "TokenExpiredError" 
          ? "Access token has expired use refresh token" 
          : "Access token is invalid";
        
        return res.status(401).json({ success: false, message });
      }

      // 3. Check User
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }

      // 4. Success! Attach user and move to next middleware
      req.UserId = user.id;
      next(); 
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};