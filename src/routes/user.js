const express = require("express");
const router = express.Router();
const {
  register,
  verify_user,
  login_user,
  unlock_user,
  change_user_role,
  get_user_by_id
} = require("../controllers/user.controller");
const { protect } = require("../middlewares/auth");
// Register a new user
router.post("/register", register);

// Verify user account
router.get("/verify/:token", verify_user);

// Login user
router.post("/login", login_user);

// Unlock user account
router.post("/unlock", unlock_user);

// Change user role
router.put("/role/change", change_user_role);

// Get user by ID
router.get("/getprofile", protect , get_user_by_id);

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmpassword:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [company, manager, employee]
 *                 default: participant
 *             required:
 *               - email
 *               - password
 *               - confirmpassword
 *     responses:
 *       201:
 *         description: User Signed Up Successfully, Waiting for verification
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /users/verify/{token}:
 *   get:
 *     summary: Verify user account
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token to verify user account
 *     responses:
 *       200:
 *         description: User account verified successfully
 *       400:
 *         description: Invalid Token
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */


module.exports = router;
