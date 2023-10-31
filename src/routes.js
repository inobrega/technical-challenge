import express from 'express';
import * as moviesController from './controllers/moviesController.js';

const router = express.Router();

router.get('/movies/all', moviesController.listMovies);
router.post('/movies', moviesController.createMovie);
router.put('/movies/:movieId', moviesController.updateMovie);
router.delete('/movies/:movieId', moviesController.deleteMovie);

router.post('/movies/book', moviesController.bookMovie);

export default router;
