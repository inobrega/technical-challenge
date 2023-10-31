import Movie from '../models/movie.js';

export const findAllAvailableMovies = async () => {
  const threeHoursAgo = new Date(new Date() - 3 * 60 * 60 * 1000);

  await Movie.updateMany(
    {
      'reservation.status': 'RESERVED',
      'reservation.reservedAt': { $lte: threeHoursAgo },
    },
    {
      $set: { 'reservation.status': 'NOT_RESERVED', status: 'AVAILABLE' },
    },
  );

  return Movie.find({
    $or: [
      { 'reservation.status': 'NOT_RESERVED' },
      {
        'reservation.status': 'RESERVED',
        'reservation.reservedAt': { $gt: threeHoursAgo },
      },
    ],
  });
};

export const bookMovieById = async movieId => {
  const movie = await Movie.findById(movieId);

  if (!movie) {
    return { error: true, message: 'Movie not found' };
  }

  if (movie.reservation.status === 'RESERVED') {
    return { error: true, message: 'Movie is already reserved' };
  }

  movie.reservation.status = 'RESERVED';
  movie.reservation.reservedAt = new Date();
  movie.status = 'UNAVAILABLE';

  await movie.save();

  return { reservation: movie.reservation };
};
