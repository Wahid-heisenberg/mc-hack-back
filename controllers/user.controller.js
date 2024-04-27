const User = require("../models/user.model");
const send_email = require("../utils/email.js");
const Token = require("../models/token.model");
const {
  registrationSchema,
  loginSchema,
} = require("../validators/user.validators");

const {
  hashpassword,
  generateTokenAnditsHash,
  hashToken,
  comparePassword,
} = require("../utils/hash.js");
const generate_token = require("../utils/jwt.js");

exports.register = async (req, res) => {
  try {
    const { email, password, confirmpassword, userRole, company } = req.body;
    const { value, error } = registrationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await hashpassword(password);

    const user = await User.create({
      email,
      password: hashedPassword,
      userRole,
    });
    const { token, hashedToken } = await generateTokenAnditsHash(user._id);
    if (user && token) {
      await Token.create({
        token: hashedToken,
        user: user._id,
        created_at: new Date(),
        expires_at: new Date(Date.now() + 30 * 60 * 1000),
      });
      await send_email(
        user.email,
        "Welcome to shoot hackathon - Account Verification required",
        "confirmation",
        {
          token,
          email: user.email,
        }
      );
      return res.status(201).json({
        success: true,
        message: "User Signed Up Successfully, Waiting for verification",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

exports.verify_user = async (req, res) => {
  try {
    const token = req.params.token;
    const hashedToken = await hashToken(token);
    const tokenExists = await Token.findOne({ token: hashedToken });

    if (!tokenExists) {
      return res.status(400).json({
        success: false,
        error: "Invalid Token",
      });
    }
    console.log(tokenExists);

    const user = await User.findOne({ _id: tokenExists.user });
    console.log(user);
    if (!user) {
      return res.status(400).json({
        success: false,
        error: "User Not Found",
      });
    }
    await user.updateOne({ isVerified: true });

    res.render("email-verified");
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.login_user = async (req, res) => {
  try {
    const { value, error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { email, password } = req.body;
    console.log(email, password);

    const user = await User.findOne({
      email,
    });
    console.log(user);
    if (!user) {
      return res.status(400).json({
        success: false,
        error: "User Not Found",
      });
    }
    if (!user.isVerified) {
      return res
        .status(403)
        .json({ success: false, error: "User Not Verified" });
    }
    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({
        success: false,
        error: "Invalid Password",
      });
    }

    if (user.isLocked) {
      res.redirect("http://localhost:5173/confirm-email");
    } else {
      res.status(200).json({
        success: true,
        message: "User Logged In Successfully",
        token: generate_token(user.user_id, user.userRole),
      });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.unlock_user = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    if (user.isLocked) {
      await user.updateOne({ isLocked: false });
      return res.status(200).json({
        success: true,
        message: "User Logged In and unlocked Successfully",
        token: generate_token(user.user_id, user.userRole),
      });
    }
    return res
      .status(400)
      .json({ success: false, error: "User is not locked" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

exports.change_user_role = async (req, res) => {
  try {
    const { email, userRole } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    await user.updateOne({ user });
    return res
      .status(200)
      .json({ success: true, message: "User role updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

exports.get_user_by_id = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate({
      path: 'company',
      select: '-password' // Exclude the password field
    });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

