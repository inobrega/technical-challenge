import mongoose from 'mongoose';

const FilmeSchema = new mongoose.Schema({
  title: String,
  reserved: { type: Boolean, default: false },
  rented: { type: Boolean, default: false },
});

export default mongoose.model('Filme', FilmeSchema);
