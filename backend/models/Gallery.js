const mongoose = require('mongoose');
const GallerySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  coverImage: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Gallery', GallerySchema);
