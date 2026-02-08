import jwt from "jsonwebtoken";
import { User } from "../modules/userschema.js";

export const isAuthentication = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({
        success: false,
        message: "Access token is missing or invalid",
      });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        const message = err.name === "TokenExpiredError" 
          ? "Access token has expired use refresh token" 
          : "Access token is invalid";
        
        return res.status(401).json({ success: false, message });
      }

      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }

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