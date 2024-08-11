const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/user/user");
const { JWT_SECRET } = process.env;

exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    let user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();

    res.json({ msg: "user successfully registered" });

    // const payload = {
    //   user: {
    //     id: user.id,
    //   },
    // };

    // jwt.sign(payload, JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
    //   if (err) throw err;
    //   res.json({ token });
    // });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    let user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token, role: user.role });
    });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }

    res.status(200).json({ msg: "user deleted successfully." });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { username, currentPassword, newPassword } = req.body;

    // Find the user by ID
    let user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Check if the current password is correct
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Current password is incorrect" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.json({ msg: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};
