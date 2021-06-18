import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {routerMovies} from "./routes/routeMovies";

createConnection().then(async connection => {
    // create express app
    const app: express.Express = express()
    app.use(bodyParser.json());

    app.use(routerMovies)

    // start express server
    app.listen(3000,'localhost');

    console.log("Express server has started on port 3000. Open http://localhost:3000/ to see results");

}).catch(error => console.log(error));
