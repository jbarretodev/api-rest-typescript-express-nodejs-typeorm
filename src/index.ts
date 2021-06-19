import "reflect-metadata"
import {createConnection} from "typeorm"
import * as express from "express"
import * as bodyParser from "body-parser"
import {routerMovies} from "./routes/routeMovies"
import {routeUser} from "./routes/routerUser"
import {routeAuth} from "./routes/routeAuth"
import {routeActor} from "./routes/routeActor";
import {routerCategory} from "./routes/routeCategory";
const listEndpoints = require('express-list-endpoints')

createConnection()
    .then(async connection => {
        const app: express.Express = express()
        app.use(bodyParser.json());

        app.use(routerMovies)
        app.use(routeUser)
        app.use(routeAuth)
        app.use(routeActor)
        app.use(routerCategory)

        app.listen(3000,'localhost');

        console.log("Api Running in PORT 3000 and IP \"localhost\" 😎💫🚀");

        console.log(listEndpoints(app),`Cantidad de endpoints: ${listEndpoints(app).length}`);

    })
    .catch(error => console.log(error));
