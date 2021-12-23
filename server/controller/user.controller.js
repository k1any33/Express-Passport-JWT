const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User.js');
const secretKey = require('../config/keys.js').secretKey;

register = async (req, res) => {
  const { email, password, userName } = req.body;
  try {
    // Find existing user in DB
    const existingUser = await User.findOne({ email });

    // Check if email already exists in DB
    if (existingUser) return res.status(400).json({ message: 'Email already exists!' });

    // Hash password before it saving in DB
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user in DB
    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    const tokenPayload = { id: newUser._id };
    const token = jwt.sign(tokenPayload, secretKey, { expiresIn: '7d' });

    res.cookie('jwt', token, { httpOnly: true });
    res.status(200).json({ newUser, token });
  } catch (error) {
    console.log(error);
  }
};

login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find existing user in DB
    const existingUser = await User.findOne({ email });

    // Check if email/user exists
    if (!existingUser) return res.status(404).json({ message: 'Email does not exist in DB' });

    // Check if password same as hashed password
    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) return res, status(404).json({ message: 'Password is incorrect' });

    // JWT Payload
    const tokenPayload = { id: existingUser._id };
    const token = jwt.sign(tokenPayload, secretKey, { expiresIn: '7d' });

    res.cookie('jwt', token, { httpOnly: true });

    // res.status(200).json({ newUser: existingUser, token: `Bearer ${token}` });
    res.status(200).json({ newUser: existingUser, token });
  } catch (error) {
    console.log(error);
  }
};

logout = async (req, res) => {
  res.clearCookie('jwt');
  res.send({ message: 'successfully cleared cookie' });
};

module.exports = {
  register,
  login,
  logout,
};
