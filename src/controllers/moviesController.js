import * as moviesService from '../services/moviesService.js';

export const listMovies = async (req, res) => {
  try {
    const movies = await moviesService.findAllAvailableMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const bookMovie = async (req, res) => {
  try {
    const { movieId, customerId } = req.body;
    const reservation = await moviesService.bookMovie(movieId, customerId);
    res.json({
      reserveId: reservation._id.toString(),
      status: reservation.status,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const createMovie = async (req, res) => {
  try {
    const newMovie = await moviesService.createMovie(req.body);
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const movieUpdates = req.body;
    const updatedMovie = await moviesService.updateMovie(movieId, movieUpdates);
    res.json(updatedMovie);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    await moviesService.deleteMovie(movieId);
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const confirmMovieRental = async (req, res) => {
  try {
    const { reserveId, customer } = req.body;
    const confirmation = await moviesService.confirmRental(reserveId, customer);
    res.status(200).json(confirmation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const returnMovie = async (req, res) => {
  try {
    const { scheduleId } = req.body;
    const returnInfo = await moviesService.returnMovie(scheduleId);
    res.status(200).json(returnInfo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
