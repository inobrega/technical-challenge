import * as moviesService from '../../src/services/moviesService.js';
import * as moviesController from '../../src/controllers/moviesController.js';
import { jest } from '@jest/globals';

jest.mock('../../src/services/moviesService.js');

describe('moviesController', () => {
  describe('listMovies', () => {
    it('should return a list of movies and a status 200', async () => {
      const mockReq = {};
      const mockRes = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
      const mockMovies = [
        { id: 1, name: 'Movie 1' },
        { id: 2, name: 'Movie 2' },
      ];

      moviesService.findAllAvailableMovies.mockResolvedValue(mockMovies);

      await moviesController.listMovies(mockReq, mockRes);

      expect(moviesService.findAllAvailableMovies).toHaveBeenCalled();
      expect(mockRes.json).toHaveBeenCalledWith(mockMovies);
    });

    it('should handle errors and return status 500', async () => {
      const mockReq = {};
      const mockRes = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      const error = new Error('Error occurred');

      moviesService.findAllAvailableMovies.mockRejectedValue(error);

      await moviesController.listMovies(mockReq, mockRes);

      expect(moviesService.findAllAvailableMovies).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({ message: error.message });
    });
  });

  describe('bookMovie', () => {
    const req = {
      body: {
        movieId: 'movie123',
        customerId: 'customer123',
      },
    };

    const mockReservation = {
      _id: 'reservation123',
      status: 'RESERVED',
    };

    let res;

    beforeEach(() => {
      res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
    });

    it('should return a reservation object with reserveId and status', async () => {
      moviesService.bookMovie.mockResolvedValue(mockReservation);

      await moviesController.bookMovie(req, res);

      expect(moviesService.bookMovie).toHaveBeenCalledWith(
        'movie123',
        'customer123',
      );

      expect(res.json).toHaveBeenCalledWith({
        reserveId: 'reservation123',
        status: 'RESERVED',
      });
    });

    it('should handle errors and return status 500 with an error message', async () => {
      const errorMessage = 'Error booking movie';
      moviesService.bookMovie.mockRejectedValue(new Error(errorMessage));

      await moviesController.bookMovie(req, res);

      expect(moviesService.bookMovie).toHaveBeenCalledWith(
        'movie123',
        'customer123',
      );

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe('createMovie', () => {
    const req = {
      body: {
        name: 'Inception',
        synopsis:
          'A thief who steals corporate secrets through the use of dream-sharing technology...',
        rating: 'PG-13',
      },
    };

    const mockNewMovie = {
      _id: 'movie123',
      name: 'Inception',
      synopsis:
        'A thief who steals corporate secrets through the use of dream-sharing technology...',
      rating: 'PG-13',
      status: 'AVAILABLE',
    };

    let res;

    beforeEach(() => {
      res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
    });

    it('should create a new movie and return the movie object', async () => {
      moviesService.createMovie.mockResolvedValue(mockNewMovie);

      await moviesController.createMovie(req, res);

      expect(moviesService.createMovie).toHaveBeenCalledWith(req.body);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockNewMovie);
    });

    it('should handle errors and return status 500 with an error message', async () => {
      const errorMessage = 'Error creating movie';
      moviesService.createMovie.mockRejectedValue(new Error(errorMessage));

      await moviesController.createMovie(req, res);

      expect(moviesService.createMovie).toHaveBeenCalledWith(req.body);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe('updateMovie', () => {
    const req = {
      params: {
        movieId: 'movie123',
      },
      body: {
        name: 'Inception Updated',
        synopsis: 'Updated synopsis...',
      },
    };

    const updatedMovie = {
      _id: 'movie123',
      name: 'Inception Updated',
      synopsis: 'Updated synopsis...',
      rating: 'PG-13',
      status: 'AVAILABLE',
    };

    let res;

    beforeEach(() => {
      res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
    });

    it('should update the movie and return the updated movie object', async () => {
      moviesService.updateMovie.mockResolvedValue(updatedMovie);

      await moviesController.updateMovie(req, res);

      expect(moviesService.updateMovie).toHaveBeenCalledWith(
        req.params.movieId,
        req.body,
      );

      expect(res.json).toHaveBeenCalledWith(updatedMovie);
    });

    it('should handle other errors and return status 500 with an error message', async () => {
      const errorMessage = 'Error updating movie';
      moviesService.updateMovie.mockRejectedValue(new Error(errorMessage));

      await moviesController.updateMovie(req, res);

      expect(moviesService.updateMovie).toHaveBeenCalledWith(
        req.params.movieId,
        req.body,
      );

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe('deleteMovie', () => {
    const req = {
      params: {
        movieId: 'movie123',
      },
    };

    let res;

    beforeEach(() => {
      res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
    });

    it('should delete the movie and return status 204', async () => {
      moviesService.deleteMovie.mockResolvedValue();

      await moviesController.deleteMovie(req, res);

      expect(moviesService.deleteMovie).toHaveBeenCalledWith(
        req.params.movieId,
      );

      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    it('should handle other errors and return status 500 with an error message', async () => {
      const errorMessage = 'Error deleting movie';
      moviesService.deleteMovie.mockRejectedValue(new Error(errorMessage));

      // Chamando a função a ser testada
      await moviesController.deleteMovie(req, res);

      expect(moviesService.deleteMovie).toHaveBeenCalledWith(
        req.params.movieId,
      );

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe('confirmMovieRental', () => {
    const req = {
      body: {
        reserveId: 'reserve123',
        customer: {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '1234567890',
        },
      },
    };

    let res;

    beforeEach(() => {
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });

    it('should confirm movie rental and return confirmation details', async () => {
      const fakeConfirmation = {
        scheduleId: 'schedule123',
        status: 'LEASED',
      };

      moviesService.confirmRental.mockResolvedValue(fakeConfirmation);

      await moviesController.confirmMovieRental(req, res);

      expect(moviesService.confirmRental).toHaveBeenCalledWith(
        req.body.reserveId,
        req.body.customer,
      );

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(fakeConfirmation);
    });

    it('should handle other errors and return status 400 with an error message', async () => {
      const errorMessage = 'Error confirming rental';
      moviesService.confirmRental.mockRejectedValue(new Error(errorMessage));

      await moviesController.confirmMovieRental(req, res);

      expect(moviesService.confirmRental).toHaveBeenCalledWith(
        req.body.reserveId,
        req.body.customer,
      );

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe('returnMovie', () => {
    const req = {
      body: {
        scheduleId: 'schedule123',
      },
    };

    let res;

    beforeEach(() => {
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });

    it('should return movie and provide return details', async () => {
      const fakeReturnInfo = {
        scheduleId: req.body.scheduleId,
        status: 'RETURNED',
      };

      moviesService.returnMovie.mockResolvedValue(fakeReturnInfo);

      await moviesController.returnMovie(req, res);

      expect(moviesService.returnMovie).toHaveBeenCalledWith(
        req.body.scheduleId,
      );

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(fakeReturnInfo);
    });

    it('should handle other errors and return status 400 with an error message', async () => {
      const errorMessage = 'Error returning movie';
      moviesService.returnMovie.mockRejectedValue(new Error(errorMessage));

      await moviesController.returnMovie(req, res);

      expect(moviesService.returnMovie).toHaveBeenCalledWith(
        req.body.scheduleId,
      );

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });
});
