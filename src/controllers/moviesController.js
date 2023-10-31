import * as moviesService from '../services/moviesService.js';

export const listMovies = async (req, res) => {
  try {
    const movies = await moviesService.findAllAvailableMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const bookMovie = async (req, res) => {
  try {
    const { movieId } = req.body;
    const result = await moviesService.bookMovieById(movieId);

    if (result.error) {
      res.status(400).json({ message: result.message });
    } else {
      res.json({
        message: 'Movie successfully booked',
        reservation: result.reservation,
      });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
