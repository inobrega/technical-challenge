import express from 'express';
import {
  bookMovie,
  confirmMovieRental,
  createMovie,
  deleteMovie,
  listMovies,
  returnMovie,
  updateMovie,
} from './controllers/moviesController.js';

const router = express.Router();

router.get('/movies/all', listMovies);
router.post('/movies', createMovie);
router.put('/movies/:movieId', updateMovie);
router.delete('/movies/:movieId', deleteMovie);

router.post('/movies/book', bookMovie);
router.post('/movies/confirm', confirmMovieRental);
router.post('/movies/return', returnMovie);

export default router;
