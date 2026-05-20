const express = require("express");
const router = express.Router();
const clientController = require("../controllers/client.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

// Criar cliente (Passamos o verifyToken se o usuário precisar estar logado para se cadastrar, se for um cadastro público, pode remover o 'verifyToken,')
router.post("/", clientController.createClient);

// Buscar e atualizar precisam que o usuário esteja logado
router.get("/:id", verifyToken, clientController.getClientById);
router.put("/:id", verifyToken, clientController.updateClient);

module.exports = router;