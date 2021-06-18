import { Request, Router, Response } from 'express'
import {MovieController} from "../controller/MovieController"

const route: Router = Router()


route.get('/',(req:Request,res:Response) => {
    return res.json('api running')
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

route.post('/movies',async (req:Request,res:Response) => {
    const controllerMovie = new MovieController()
    const rs = await controllerMovie.storeMovie(req.body)
    res.statusCode = rs.statusCode
    return res.json(rs.data)
})

route.delete('/movies/:id',async (req:Request,res:Response) => {
    const controllerMovie = new MovieController()
    const rs = await controllerMovie.deleteMovie(parseInt(req.params.id))
    res.statusCode = rs.statusCode
    return res.json(rs.data)
})

route.put('/movies/:id',async (req:Request,res:Response) => {
    const controllerMovie = new MovieController()
    const rs = await controllerMovie.updateMovie(parseInt(req.params.id),req.body)
    res.statusCode = rs.statusCode
    return res.json(rs.data)
})

export const routerMovies: Router = route
