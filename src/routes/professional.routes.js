const express = require("express");
const router = express.Router();
const professionalController = require("../controllers/professional.controller");

router.post("/", professionalController.createProfessional);
router.get("/:id", professionalController.getProfessionalById);
router.put("/:id", professionalController.updateProfessional);

module.exports = router;
