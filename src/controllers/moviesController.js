import * as moviesService from '../services/moviesService.js';

export const listMovies = async (req, res) => {
  try {
    const movies = await moviesService.findAllAvailableMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
