import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const createToken = async (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET ||
      "c2VjdXJlLWp3dC1rZXktamZoc2RmM2tzZGZoa2praGZqamZrM2Zq",
    { expiresIn: "7d" }
  );
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({ message: "User already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const jwttoken = await createToken(user);

    res.cookie("JWT", jwttoken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    });

    res.status(200).json({
      message: "Registration successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: jwttoken,
    });
  } catch (err) {
    console.log("Register error ", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const jwttoken = await createToken(user);

    res.cookie("JWT", jwttoken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    });

    res.status(200).json({
      message: "Login Successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: jwttoken,
    });
  } catch (err) {
    console.log("Login error : ", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User profile not found." });
    }

    res.json(user);
  } catch (err) {
    console.error("Get Profile Error:", err); // Log the actual error for debugging
    res.status(500).json({ message: "Server error" });
  }
};
