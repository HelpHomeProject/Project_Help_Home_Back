const multer = require("multer");
const path = require("path");

//Onde e como salvar os arquivos
const storage = multer.diskStorage({
  //As img ficam na pasta upload
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  // Nome do arquivo: Data atual + um número aleatório + a extensão original (.png, .jpg)
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);

    // Exemplo de como vai ficar: image-168493920192-8492819.png
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

//Filtro para aceita so img!
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Deixa passar
  } else {
    cb(new Error("Formato inválido! Envie apenas JPG, PNG ou WEBP.")); // Barra na porta
  }
};

//limita o tamanho a uns 5mb
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 Megabytes, o calculo la
  },
});

module.exports = upload;
