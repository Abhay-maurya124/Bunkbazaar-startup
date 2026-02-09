import * as yup from "yup";

export const userschema = yup.object({
  username: yup
    .string()
    .trim()
    .min(3, "username must be at least 3 characters")
    .required(),
  password: yup
    .string()
    .trim()
    .min(4, "password must be at least 4 characters")
    .required(),
  email: yup.string().email("invalid email format").required(),
});

export const validateuser = async (req, res, next) => {
  try {
    await userschema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    // This stops the "hanging" request and tells the user what's wrong
    return res.status(400).json({ 
      success: false,
      errors: error.errors 
    });
  }
};