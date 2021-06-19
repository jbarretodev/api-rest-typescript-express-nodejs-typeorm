import { Request, Router, Response } from 'express'
import {AuthController} from "../controller/AuthController";
import {withJWTAuthMiddleware} from "express-kun";

const route: Router = Router()
const middlewareAuth = withJWTAuthMiddleware(route,'someString')

route.post('/login',async (req:Request,res:Response) => {
    const controllerMovie = new AuthController()
    const rs = await controllerMovie.login(req.body)
    res.statusCode = rs.statusCode
    return res.json(rs.data)
})

middlewareAuth.get('/logout',async (req:Request,res:Response) => {
    console.dir(req.headers)
})



export const routeAuth: Router = route
