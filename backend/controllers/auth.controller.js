const db = require("../models");
const User = db.User;
const jwt = require("jsonwebtoken");
const config = require("../config/config");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email e password necessários" });

    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(409).json({ message: "Utilizador já existe" });

    const user = await User.create({ email, password });
    return res.status(201).json({ message: "Registo concluído", data: { id: user.id, email: user.email } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro no registo", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email e password necessários" });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: "Credenciais inválidas" });

    const valid = await user.validPassword(password);
    if (!valid) return res.status(401).json({ message: "Credenciais inválidas" });

    const tokenPayload = { id: user.id, email: user.email };
    const token = jwt.sign(tokenPayload, config.secret, { expiresIn: config.expiresIn });

    return res.status(200).json({ AccessToken: token, user: { id: user.id, email: user.email } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro no login", error: err.message });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const payload = { id: req.userId, email: req.userEmail };
    const token = jwt.sign(payload, config.secret, { expiresIn: config.expiresIn });
    return res.status(200).json({ AccessToken: token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro a renovar token", error: err.message });
  }
};
