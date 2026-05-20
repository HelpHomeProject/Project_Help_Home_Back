const Client = require("../models/client.model");
const { cpf } = require("cpf-cnpj-validator");

// POST - Criar Cliente com validação de CPF
exports.createClient = async (req, res) => {
  try {
    const { name, email, cpf: cpfInput, phone } = req.body;

    // 1. Validação básica de campos obrigatórios
    if (!name || !email || !cpfInput) {
      return res.status(400).json({ error: "Nome, e-mail e CPF são obrigatórios" });
    }

    // 2. Validação Real do CPF usando a biblioteca
    if (!cpf.isValid(cpfInput)) {
      return res.status(400).json({ error: "O CPF fornecido é inválido!" });
    }

    // 3. Salva no banco de dados
    const newClient = new Client({
      name,
      email,
      cpf: cpfInput,
      phone,
    });
    
    await newClient.save();
    res.status(201).json(newClient);
  } catch (error) {
    // Trata erro de e-mail ou CPF duplicado no banco
    if (error.code === 11000) {
      return res.status(400).json({ error: "E-mail ou CPF já cadastrado no sistema." });
    }
    res.status(500).json({ error: "Erro ao criar cliente." });
  }
};

// GET - Buscar Cliente por ID
exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({ error: "Cliente não encontrado!" });
    }

    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar cliente." });
  }
};

// PUT - Atualizar Cliente
exports.updateClient = async (req, res) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedClient) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    res.status(200).json(updatedClient);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar cliente" });
  }
};