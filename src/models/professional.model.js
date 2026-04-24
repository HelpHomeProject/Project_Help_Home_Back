const mongoose = require("mongoose");

const ProfessionalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, 
      lowercase: true, 
      trim: true,
    },
    specialty: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Professional", ProfessionalSchema);
