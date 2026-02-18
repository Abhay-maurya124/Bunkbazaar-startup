import mongoose from "mongoose";
import { Cart } from "../modules/Productschema.js";
import { Product } from "../modules/Product.js";

/* ================= ADD TO CART ================= */
export const addtocart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid productId" });
    }

    if (!quantity || quantity <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Quantity must be > 0" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const existingItem = await Cart.findOne({ userId, productId });

    if (existingItem) {
      existingItem.quantity += Number(quantity);
      await existingItem.save();

      return res.status(200).json({
        success: true,
        message: "Cart item updated",
        cart: existingItem,
      });
    }

    const newCartItem = await Cart.create({
      userId,
      productId: product._id,
      quantity,
    });

    return res.status(201).json({
      success: true,
      message: "Item added to cart",
      cart: newCartItem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ================= REMOVE ITEM ================= */
export const removefromcart = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid cart id" });
    }

    const deleted = await Cart.findByIdAndDelete(id);

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Cart item not found" });
    }

    res.status(200).json({ success: true, message: "Item removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ================= CLEAR CART ================= */
export const clearcart = async (req, res) => {
  try {
    const userId = req.userId;

    const result = await Cart.deleteMany({ userId });

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      deletedItems: result.deletedCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ================= UPDATE QUANTITY ================= */
export const updatecart = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid cart id" });
    }

    if (!quantity || quantity <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Quantity must be > 0" });
    }

    const updated = await Cart.findByIdAndUpdate(
      id,
      { quantity },
      { new: true },
    );

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Cart item not found" });
    }

    res.status(200).json({
      success: true,
      message: "Cart updated",
      cart: updated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ================= GET SINGLE ITEM ================= */
export const getsinglecartitem = async (req, res) => {
  try {
    const { id } = req.params;

    const cartItem = await Cart.findById(id).populate("productId");

    if (!cartItem) {
      return res
        .status(404)
        .json({ success: false, message: "Cart item not found" });
    }

    res.status(200).json({ success: true, cartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ================= GET ALL CART ITEMS ================= */
export const allcartitem = async (req, res) => {
  try {
    const userId = req.userId;

    const cartdata = await Cart.find({ userId }).populate({
      path: "productId",
      select: "title price image description",
    });

    res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      cartdata,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
