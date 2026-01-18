const mongoose = require('mongoose');

const PhotographerSchema = new mongoose.Schema({
  uid: { type: String, unique: true },
  email: String,
  passwordHash: String,
  companyName: String,
  slogan: String,
  companyEmail: String,
  phone: String,
  address: String,
  description: String,
  instagram: String,
  facebook: String,
  tiktok: String,
  linkedin: String,
  logoURL: String,
  updatedAt: Date
});

module.exports = mongoose.model('Photographer', PhotographerSchema);
