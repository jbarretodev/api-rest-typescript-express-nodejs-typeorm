import "reflect-metadata"
import {createConnection} from "typeorm"
import * as express from "express"
import * as bodyParser from "body-parser"
import {routerMovies} from "./routes/routeMovies"
import {routeUser} from "./routes/routerUser"
import {routeAuth} from "./routes/routeAuth"
import {routeActor} from "./routes/routeActor";

createConnection().then(async connection => {
    // create express app
    const app: express.Express = express()
    app.use(bodyParser.json());

    app.use(routerMovies)
    app.use(routeUser)
    app.use(routeAuth)
    app.use(routeActor)

    // start express server
    app.listen(3000,'localhost');

    console.log("Express server has started on port 3000. Open http://localhost:3000/ to see results");

}).catch(error => console.log(error));
