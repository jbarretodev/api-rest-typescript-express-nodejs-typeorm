import { Request, Router, Response } from 'express'
import {UserController} from "../controller/UserController";
import {withJWTAuthMiddleware} from "express-kun";
import {decodeToken} from "../utils/utils";

const route: Router = Router()
const middlewareAuth = withJWTAuthMiddleware(route,'someString')

route.post('/users',async (req:Request,res:Response) => {
    const userController = new UserController()
    const rs = await userController.save(req.body)
    res.statusCode = rs.statusCode
    return res.json(rs.data)
})

middlewareAuth.delete('/users/movie/:id',async (req:Request,res:Response) => {
    const userController = new UserController()
    const tokenDecoded = decodeToken(req.header('authorization'))
    const rs = await userController.removeMovie(parseInt(tokenDecoded.id),parseInt(req.params.id))
    res.statusCode = rs.statusCode
    return res.json(rs.data)
})

middlewareAuth.get('/users/favorite-movies',async (req:Request,res:Response) => {
    const userController = new UserController()
    const tokenDecoded = decodeToken(req.header('authorization'))
    const rs = await userController.getMyFavoriteMovies(parseInt(tokenDecoded.id))
    res.statusCode = rs.statusCode
    return res.json(rs.data)
})

route.get('/users',async (req:Request,res:Response) => {
    const userController = new UserController()
    const rs = await userController.all()
    res.statusCode = rs.statusCode
    return res.json(rs.data)
})

route.get('/users/:id',async (req:Request,res:Response) => {
    const userController = new UserController()
    const rs = await userController.one(parseInt(req.params.id))
    res.statusCode = rs.statusCode
    return res.json(rs.data)
})

middlewareAuth.delete('/users/:id',async (req:Request,res:Response) => {
    const userController = new UserController()
    const rs = await userController.remove(parseInt(req.params.id))
    res.statusCode = rs.statusCode
    return res.json(rs.data)
})

middlewareAuth.put('/users/',async (req:Request,res:Response) => {
    const userController = new UserController()
    const rs = await userController.update(parseInt(req.params.id),req.body)
    res.statusCode = rs.statusCode
    return res.json(rs.data)
})

middlewareAuth.post('/users/movie-favorite',async (req:Request,res:Response) => {
    const userController = new UserController()
    const tokenDecoded = decodeToken(req.header('authorization'))
    const rs = await userController.setMovieAsFavorite(parseInt(req.body.movieId),parseInt(tokenDecoded.id))
    res.statusCode = rs.statusCode
    return res.json(rs.data)
})

export const routeUser: Router = route
