const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authController = {
  async signup(req, res) {
    try {
      const { name, email, password } = req.body;

      // Check if user exists
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: "User already exists" });

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.log(error)
      res.status(500).json({ message: "Error signing up", error });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      console.log(email)
      console.log(password);

      // Find user by email
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "No User Found!" });

      // Validate password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials!" });

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION_IN_DAYS * 24 * 60 * 60 }
      );

      // Set token in HTTP-only cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Secure in production
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.json({ message: "Login successful" });
    } catch (error) {
        console.log(error);
        
      res.status(500).json({ message: "Error logging in", error });
    }
  }
};

module.exports = authController;
