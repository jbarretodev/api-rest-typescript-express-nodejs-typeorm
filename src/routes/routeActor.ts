import { Request, Router, Response } from 'express'
import {withJWTAuthMiddleware} from "express-kun"
import {ActorController} from "../controller/ActorController"


const route: Router = Router()
const middlewareAuth = withJWTAuthMiddleware(route,'someString')

route.get('/actors',async (req:Request,res:Response) => {
    const actorController = new ActorController()
    const rs = await actorController.getAllActors()
    res.statusCode = rs.statusCode
    return res.json(rs.data)
})

route.get('/actors/movies',async (req:Request,res:Response) => {
    const actorController = new ActorController()
    const rs = await actorController.actorMovie()
    res.statusCode = rs.statusCode
    return res.json(rs.data)
})

route.get('/actors/:id',async (req:Request,res:Response) => {
    const actorController = new ActorController()
    const rs = await actorController.getOneActor(parseInt(req.params.id))
    res.statusCode = rs.statusCode
    return res.json(rs.data)
})

middlewareAuth.post('/actors',async (req:Request,res:Response) => {
    const actorController = new ActorController()
    const rs = await actorController.saveActor(req.body)
    res.statusCode = rs.statusCode
    return res.json(rs.data)
})

middlewareAuth.delete('/actors/:id',async (req:Request,res:Response) => {
    const actorController = new ActorController()
    const rs = await actorController.deleteActor(parseInt(req.params.id))
    res.statusCode = rs.statusCode
    return res.json(rs.data)
})

middlewareAuth.put('/actors/:id',async (req:Request,res:Response) => {
    const actorController = new ActorController()
    const rs = await actorController.updateActor(req.body,parseInt(req.params.id))
    res.statusCode = rs.statusCode
    return res.json(rs.data)
})


export const routeActor: Router = route
