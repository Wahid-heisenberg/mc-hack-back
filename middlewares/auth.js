const jwt = require("jsonwebtoken");
const fs = require("fs");
const User = require("../models/user.model");
const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.user = await User.findByPk(decoded._id , {attributes: {exclude: ['password']}});

        next();
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    }

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

const company = (req, res, next) => {
  console.log(req.user);
  if (req.user && req.user.role === "company") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an company");
  }
};

const manager = (req, res, next) => {
  if (req.user && req.user.role === "manager") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an manager");
  }
};

const employee = (req, res, next) => {
  if (req.user && req.user.role === "employee") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as a employee") 
  }
};

const superuser = (req, res, next) => {
  if (req.user && req.user.role === "superuser") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as a superuser");
  }
};


module.exports = { protect, company, manager, employee, superuser};