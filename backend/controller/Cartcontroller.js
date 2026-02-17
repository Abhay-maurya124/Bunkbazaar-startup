import { User } from "../modules/userschema";

export const addtocart = async (req, res) => {
  const { userid, productId, quantity } = req.body;
  const user = User.findById(userid);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "User not found",
    });
  }
  const additem = user.cart.findIndex(
    (item) => item.productId.toString() === productId,
  );
};
export const removefromcart = async (req, res) => {};
export const clearcart = async (req, res) => {};
export const updatecart = async (req, res) => {};
export const getsinglecartitem = async (req, res) => {};
export const allcartitem = async (req, res) => {};
