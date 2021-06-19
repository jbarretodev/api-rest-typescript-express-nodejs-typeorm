import { Request, Router, Response } from 'express'
import {AuthController} from "../controller/AuthController";
const jwt = require('jsonwebtoken')

const route: Router = Router()

route.post('/login',async (req:Request,res:Response) => {
    const controllerMovie = new AuthController()
    const rs = await controllerMovie.login(req.body)
    res.statusCode = rs.statusCode
    return res.json(rs.data)
})


export const routeAuth: Router = route
