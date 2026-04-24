const express = require("express");
const router = express.Router();
const professionalController = require("../controllers/professional.controller");

// import do middleware das img
const upload = require("../middlewares/upload.middleware");

// colocada a img no endpoint para acessar pelo front
router.post(
  "/",
  upload.single("image"),
  professionalController.createProfessional,
);

router.get("/:id", professionalController.getProfessionalById);
router.put("/:id", professionalController.updateProfessional);

module.exports = router;
