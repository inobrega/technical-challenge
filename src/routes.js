import express from 'express';
import * as moviesController from './controllers/moviesController.js';

const router = express.Router();

router.get('/movies/all', moviesController.listMovies);

export default router;
