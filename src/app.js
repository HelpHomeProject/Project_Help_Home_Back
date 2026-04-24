const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para o Express entender JSON no corpo das requisições
app.use(express.json());
const path = require('path'); // torna a pasta upload publica para acessar as img nela
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Autenticando as rotas
const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

// as rotas do professional
const professionalRoutes = require("./routes/professional.routes");
app.use("/professionals", professionalRoutes);

// Rota de teste pra ver se tá funfando
app.get("/api/status", (req, res) => {
  res.status(200).json({
    mensagem: "Servidor rodando perfeitamente, cambio desligo!",
    status: "OK",
  });
});

// Conectando o DB e o sv
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongoose conectado com sucesso ao MongoDB!");
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Erro fatal ao conectar no MongoDB:", error);
  });
