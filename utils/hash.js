const bcrypt = require("bcrypt");
const crypto = require("crypto");
const hashpassword = async (password) => {
    return await bcrypt.hash(password, 10);
    }

const generateTokenAnditsHash = async (user_id) => {
    const token = crypto.randomBytes(20).toString('hex') + user_id;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    return { token, hashedToken };
    }

const hashToken = async (token) => {
    return crypto.createHash("sha256").update(token).digest("hex");
    }

const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
    }


module.exports = { hashpassword,generateTokenAnditsHash, hashToken , comparePassword};