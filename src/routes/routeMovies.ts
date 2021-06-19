import { Request, Router, Response } from 'express'
import {MovieController} from "../controller/MovieController"
import {withJWTAuthMiddleware} from "express-kun";

const route: Router = Router()
const middlewareAuth = withJWTAuthMiddleware(route,'someString')


route.get('/',(req:Request,res:Response) => {
    return res.json('api running')
})

route.get('/movies/users-favorites',async (req:Request,res:Response) => {
    const controllerMovie = new MovieController()
    const rs = await controllerMovie.getMoviesWithUsers()
    res.statusCode = rs.statusCode
    return res.json(rs.data)
})

route.get('/movies', async (req:Request,res:Response) => {
    const controllerMovie = new MovieController()
    const movies = await controllerMovie.getAllMovies()
    res.statusCode = movies.statusCode
    return res.json(movies.data)
})

route.get('/movies/:id',async(req:Request,res:Response) => {
    const controllerMovie = new MovieController()
    const rs = await controllerMovie.getMovieById(parseInt(req.params.id))
    res.statusCode = rs.statusCode
    return res.json(rs.data)
})

middlewareAuth.post('/movies',async (req:Request,res:Response) => {
    const controllerMovie = new MovieController()
    const rs = await controllerMovie.storeMovie(req.body)
    res.statusCode = rs.statusCode
    return res.json(rs.data)
})

middlewareAuth.delete('/movies/:id',async (req:Request,res:Response) => {
    const controllerMovie = new MovieController()
    const rs = await controllerMovie.deleteMovie(parseInt(req.params.id))
    res.statusCode = rs.statusCode
    return res.json(rs.data)
})

middlewareAuth.put('/movies/:id',async (req:Request,res:Response) => {
    const controllerMovie = new MovieController()
    const rs = await controllerMovie.updateMovie(parseInt(req.params.id),req.body)
    res.statusCode = rs.statusCode
    return res.json(rs.data)
})

middlewareAuth.post('/assign-actor-movie',async (req:Request,res:Response) => {
    const controllerMovie = new MovieController()
    const rs = await controllerMovie.actorToMovie(parseInt(req.body.movieId),parseInt(req.body.actorId))
    res.statusCode = rs.statusCode
    return res.json(rs.data)
})

export const routerMovies: Router = route
