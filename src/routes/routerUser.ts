import { Request, Router, Response } from 'express'
import {UserController} from "../controller/UserController";
import {withJWTAuthMiddleware} from "express-kun";

const route: Router = Router()

const middlewareAuth = withJWTAuthMiddleware(route,'someString')

middlewareAuth.post('/users',async (req:Request,res:Response) => {
    const userController = new UserController()
    const rs = await userController.save(req.body)
    res.statusCode = rs.statusCode
    return res.json(rs.data)
})

middlewareAuth.get('/users',async (req:Request,res:Response) => {
    const userController = new UserController()
    const rs = await userController.all()
    res.statusCode = rs.statusCode
    return res.json(rs.data)
})

middlewareAuth.get('/users/:id',async (req:Request,res:Response) => {
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

middlewareAuth.put('/users/:id',async (req:Request,res:Response) => {
    const userController = new UserController()
    const rs = await userController.update(parseInt(req.params.id),req.body)
    res.statusCode = rs.statusCode
    return res.json(rs.data)
})


export const routeUser: Router = route
