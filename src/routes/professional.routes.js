const express = require("express");
const router = express.Router();
const professionalController = require("../controllers/professional.controller");
const upload = require("../middlewares/upload.middleware");

// importa os tokens de verificacao la do auth
const {
  verifyToken,
  isProfessionalRole,
} = require("../middlewares/auth.middleware");

// coloca eles no post, so avanca se tiver token valido
router.post(
  "/",
  verifyToken, 
  isProfessionalRole, // verifica a role
  upload.single("image"), // verifica o raio da img
  professionalController.createProfessional, // tudo ok, salva no banco
);

router.get("/:id", professionalController.getProfessionalById);
router.put("/:id", professionalController.updateProfessional);

module.exports = router;