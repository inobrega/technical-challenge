import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  reservationId: mongoose.Schema.Types.ObjectId,
  user: {
    userId: mongoose.Schema.Types.ObjectId,
    username: String,
    email: String,
  },
  reservedAt: Date,
  rentedAt: Date,
  status: {
    type: String,
    enum: ['RESERVED', 'NOT_RESERVED', 'WAITING'],
    default: 'NOT_RESERVED',
  },
});

const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    synopsis: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    status: {
      type: String,
      required: true,
      enum: ['AVAILABLE', 'UNAVAILABLE'],
      default: 'AVAILABLE',
    },
    reservation: reservationSchema,
  },
  { timestamps: true },
);

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
