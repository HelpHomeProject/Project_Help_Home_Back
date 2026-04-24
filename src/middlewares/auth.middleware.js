const jwt = require("jsonwebtoken");

// verifica se o token é valido
exports.verifyToken = (req, res, next) => {
  // Pega o token do header da requisicao
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ error: "Acesso negado! Você precisa estar logado." });
  }

  try {
    // decodifica o token pela key
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // guarda os dados! não é stateless
    next(); // so vem
  } catch (error) {
    res.status(400).json({ error: "Token inválido ou expirado!" });
  }
};

// verifica a role (profissional ou cliente)
exports.isProfessionalRole = (req, res, next) => {
  // confere se o user é de role profissional
  if (req.user && req.user.role === "PROFESSIONAL") {
    next(); // se sim, cria o cadastro
  } else {
    res
      .status(403)
      .json({
        error:
          "Acesso restrito! Apenas usuários com perfil PROFESSIONAL podem realizar esta ação.",
      });
  }
};
