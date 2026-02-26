import jwt from "jsonwebtoken"; // <--- YOU WERE MISSING THIS
import { User } from "../modules/userschema.js";
import { tempSession } from "../modules/Sessionschema.js";

export const isAdmin = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ msg: "No token provided or invalid format" });
        }

        const token = authHeader.replace("Bearer ", "");
        
        // Use the secret from your .env
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        
        // CRITICAL: Fetch the user from the DB to be 100% sure of the role
        const user = await User.findById(decoded.id);
        
        if (!user) {
            return res.status(401).json({ msg: "User not found" });
        }

        if (user.role !== "admin") {
            return res.status(403).json({ msg: "Admin access required" });
        }

        // Success: Attach user to the request
        req.user = user;

        // Update activity
        await tempSession.findOneAndUpdate(
            { userid: user._id },
            { lastActivity: Date.now() },
            { upsert: true }
        );

        next();
    } catch (err) {
        console.error("Auth Error:", err.message);
        return res.status(401).json({ msg: "Invalid or Expired Token" });
    }
};