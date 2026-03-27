const express = require("express");
const mongoose = require("mongoose");
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

// ligando Mongose e startando o sv
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Mongoose conectou! Funfando o MongoDB!');
        
        //Sv so fica on se o BD tiver on também
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Deu um erro aqui, o MongoDB pifou:', error);
    });
