import { Request, Router, Response } from 'express'
import {withJWTAuthMiddleware} from "express-kun"
import {CategoryController} from "../controller/CategoryController"


const route: Router = Router()
const middlewareAuth = withJWTAuthMiddleware(route,'someString')

route.get('/categories',async (req:Request,res:Response) => {
    const controller = new CategoryController()
    const rs = await controller.getAllCategories()
    res.statusCode = rs.statusCode
    return res.json(rs.data)
})

route.get('/categories/:id',async (req:Request,res:Response) => {
    const controller = new CategoryController()
    const rs = await controller.getOneCategory(parseInt(req.params.id))
    res.statusCode = rs.statusCode
    return res.json(rs.data)
})

middlewareAuth.post('/categories',async (req:Request,res:Response) => {
    const controller = new CategoryController()
    const rs = await controller.saveCategory(req.body)
    res.statusCode = rs.statusCode
    return res.json(rs.data)
})

middlewareAuth.put('/categories/:id',async (req:Request,res:Response) => {
    const controller = new CategoryController()
    const rs = await controller.updateCategory(parseInt(req.params.id),req.body)
    res.statusCode = rs.statusCode
    return res.json(rs.data)
})

middlewareAuth.put('/categories/:id',async (req:Request,res:Response) => {
    const controller = new CategoryController()
    const rs = await controller.deleteCategory(parseInt(req.params.id))
    res.statusCode = rs.statusCode
    return res.json(rs.data)
})


export const routerCategory: Router = route
