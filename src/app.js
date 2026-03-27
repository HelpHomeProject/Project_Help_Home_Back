const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para o Express entender JSON no corpo lá das requisições
app.use(express.json());
const authRoutes = require("./routes/auth.routes"); // A autenticação e as rotas do endpoint
app.use("/auth", authRoutes);

// Rota de teste pra ver tá funfando
app.get("/api/status", (req, res) => {
  res.status(200).json({
    mensagem: "Servidor rodando perfeitamente, cambio desligo!",
    status: "OK",
  });
});

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
