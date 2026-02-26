  import { User } from "../modules/userschema.js";
  import { tempSession } from "../modules/Sessionschema.js";

  export const getStats = async (req, res) => {
      try {
          const totalUsers = await User.countDocuments();
          const verifiedUsers = await User.countDocuments({ isverified: true });
          
          const halfHourAgo = new Date(Date.  now() - 30 * 60 * 1000);
          const onlineCount = await tempSession.countDocuments({ 
              lastActivity: { $gt: halfHourAgo } 
          });

          res.status(200).json({
              success: true,
              stats: {  
                  totalUsers,
                  verifiedUsers,
                  onlineNow: onlineCount,
              }
          });
      } catch (error) {
          res.status(500).json({ message: "Error fetching dashboard stats", error: error.message });
      }
  };

  export const getAllUsers = async (req, res) => {
      try {
          const users = await User.find().select("-password -otp");
          res.status(200).json(users);
      } catch (error) {
          res.status(500).json({ message: "Could not fetch user list" });
      }
  };

  export const getAllSessions = async (req, res) => {
      try {
          const sessions = await tempSession.find()
              .populate("userid", "username email role wallet");
          
          res.status(200).json(sessions);
      } catch (error) {
          res.status(500).json({ message: "Failed to fetch active sessions" });
      }
  };

  export const adjustWallet = async (req, res) => {
      try {
          const { userId, amount } = req.body;
          
          const user = await User.findById(userId);
          if (!user) return res.status(404).json({ message: "User not found" });

          user.wallet += Number(amount);
          await user.save();

          res.status(200).json({ 
              message: "Wallet updated successfully", 
              newBalance: user.wallet 
          });
      } catch (error) {
          res.status(500).json({ message: "Wallet update failed" });
      }
  };

  export const deleteUser = async (req, res) => {
      try {
          const { id } = req.params;
          await User.findByIdAndDelete(id);
          await tempSession.deleteMany({ userid: id });

          res.status(200).json({ message: "User and related sessions deleted" });
      } catch (error) {
          res.status(500).json({ message: "Error deleting user" });
      }
  };