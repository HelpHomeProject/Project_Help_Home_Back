const Professional = require("../models/professional.model");

// POST
exports.createProfessional = async (req, res) => {
  try {
    const { name, email, specialty, phone } = req.body;

    // 👇 Capturamos o caminho da foto que o Multer acabou de salvar (se a foto foi enviada)
    const profileImage = req.file ? req.file.path : null;

    // Validação básica
    if (!name || !email || !specialty) {
      return res
        .status(400)
        .json({ error: "Nome, e-mail e especialidade são obrigatórios" });
    }
    // na hora que cria o perfil profissional, vai adc a img
    const newProfessional = new Professional({
      name,
      email,
      specialty,
      phone,
      profileImage,
    });
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
