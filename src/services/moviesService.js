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

  const movies = await Movie.find({
    $or: [
      { 'reservation.status': { $ne: 'RESERVED' } },
      { 'reservation.reservedAt': { $lt: threeHoursAgo } },
      { reservation: { $exists: false } },
    ],
  }).select('_id name synopsis rating');
  return movies.map(movie => ({
    id: movie._id,
    name: movie.name,
    synopsis: movie.synopsis,
    rating: movie.rating,
  }));
};

export const bookMovie = async (movieId, customerId) => {
  const movie = await Movie.findById(movieId);

  if (!movie) {
    throw new Error('Movie not found');
  }

  if (movie.reservation) {
    if (movie.reservation.status === 'WAITING') {
      throw new Error('Movie is already reserved');
    }

    const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000);
    if (movie.reservation.reservedAt > threeHoursAgo) {
      throw new Error('Movie can only be reserved once every three hours');
    }
  }

  movie.reservation = {
    customerId: customerId,
    reservedAt: new Date(),
    status: 'WAITING',
  };

  const updatedMovie = await movie.save();
  return updatedMovie.reservation;
};

export const createMovie = async movieData => {
  const newMovie = new Movie(movieData);
  return newMovie.save();
};

export const updateMovie = async (movieId, movieUpdates) => {
  const movie = await Movie.findById(movieId);
  if (!movie) {
    throw new Error('Movie not found');
  }

  Object.assign(movie, movieUpdates);
  return movie.save();
};

export const deleteMovie = async movieId => {
  const movie = await Movie.findById(movieId);
  if (!movie) {
    throw new Error('Movie not found');
  }

  await movie.remove();
};
