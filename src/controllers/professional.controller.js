const Professional = require("../models/professional.model");

// POST
exports.createProfessional = async (req, res) => {
  try {
    const { name, email, specialty, phone } = req.body;

    // Validacao inicial aqui
    if (!name || !email || !specialty) {
      return res
        .status(400)
        .json({ error: "Nome, e-mail e especialidade são obrigatórios!" });
    }

    // mail ta cadastrado?
    const existingProfessional = await Professional.findOne({ email });
    if (existingProfessional) {
      return res
        .status(400)
        .json({ error: "Este e-mail já está em uso por outro profissional" });
    }

    const newProfessional = new Professional({ name, email, specialty, phone });
    await newProfessional.save();

    res.status(201).json(newProfessional);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar profissional." });
  }
};

// GET
exports.getProfessionalById = async (req, res) => {
  try {
    const professional = await Professional.findById(req.params.id);

    if (!professional) {
      return res.status(404).json({ error: "Profissional não encontrado!" });
    }

    res.status(200).json(professional);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar profissional." });
  }
};

// PUT
exports.updateProfessional = async (req, res) => {
  try {
    const updatedProfessional = await Professional.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    if (!updatedProfessional) {
      return res.status(404).json({ error: "Profissional não encontrado" });
    }

    res.status(200).json(updatedProfessional);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar profissional" });
  }
};
