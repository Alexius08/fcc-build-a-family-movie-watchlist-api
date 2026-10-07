import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeModification } from '../middleware/authorize.js';
import { addMovie, deleteMovie, getWatchlist, updateMovie } from '../utils/db.js';

const router = express.Router()

router.get('/:userId', authenticate, (req, res, next) =>{
    const watchlist = getWatchlist(Number(req.params.userId))
    return res.status(200).json({"user": req.params.userId, "watchlist": watchlist})
})

router.post('/:userId', authenticate, authorizeModification, (req, res, next) =>{

})

router.post('/:userId/movies', authenticate, authorizeModification, (req, res, next) =>{
    addMovie(Number(req.params.userId), req.body)
    res.status(201).json({"message": `Added ${req.body}`})
})

router.put('/:userId/movies/:movieId', authenticate, authorizeModification, (req, res, next) =>{
    updateMovie(req.params.userId, Number(req.params.movieId), req.body)
    res.status(200).json({"message": `Updated movie ${req.params.movieId}`})
})

router.delete('/:userId/movies/:movieId', authenticate, authorizeModification, (req, res, next) =>{
    deleteMovie(Number(req.params.userId), Number(req.params.movieId))
    res.status(200).json({"message": `Deleted movie ${req.params.movieId}`})
})

export default router;