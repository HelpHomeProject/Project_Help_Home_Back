const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Rota de Registro
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // aqui valida a entrada
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    // checa se o email já tem no BD
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "E-mail já cadastrado" });
    }

    // gera o negocio lá da senha
    const passwordHash = await bcrypt.hash(password, 10);

    // salva o user
    const newUser = new User({ name, email, passwordHash });
    await newUser.save();

    // retorna Created (obg Matheus!)
    res.status(201).json({
      message: "Usuário registrado com sucesso!",
      user: { id: newUser._id, name, email },
    });
  } catch (error) {
    res.status(500).json({ error: "Erro interno ao registrar usuário" });
  }
};

// Rota de Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Entrada aqui
    if (!email || !password) {
      return res.status(400).json({ error: "E-mail e senha são obrigatórios" });
    }

    // faz aquele GET no BD
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Credenciais inválidas" }); // Não dizemos se o erro é no email ou na senha por segurança!
    }

    //compara a senha
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    //gera o negocio lá, expira com 1h
    const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    //retorna o token
    res.status(200).json({ message: "Login bem-sucedido", token });
  } catch (error) {
    res.status(500).json({ error: "Erro interno ao fazer login" });
  }
};
