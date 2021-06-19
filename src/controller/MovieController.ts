import {getRepository} from "typeorm";
import {Movie} from "../entity/Movie";
import {Actor} from "../entity/Actor";


export class MovieController{
    private movieRepository = getRepository(Movie);
    private actorRepository = getRepository(Actor);

    async getAllMovies(){
        const rs = await this.movieRepository.find();
        return (rs) ? { statusCode:200,data:rs } : { statusCode: 400,data:[] }
    }

    async getMovieById(id:number){
        console.log('llego!');
        const rs = await this.movieRepository.findOne(id);
        return (rs) ? { statusCode: 200, data:rs } : { statusCode:404, data:[] }
    }

    async storeMovie(params:any){
        const rs = await this.movieRepository.save(params)
        return (rs) ? { statusCode:201,data:rs } : { statusCode:400, data:'error saving movie' }
    }

    async deleteMovie(id:number){
        const rs = await this.movieRepository.findOne(id);
        if(!rs)
            return { statusCode:404, data: [] }


        return (await this.movieRepository.remove(rs)) ? { statusCode:200,data:true } : { statusCode:400, data:'error deleting movie' }
    }

    async updateMovie(id:number,params:any){
        const movie = await this.movieRepository.findOne(id)

        if(!movie)
            return { statusCode:404,data:[] }

        return (await this.movieRepository.update(id,params)) ? { statusCode:200,data:true } : { statusCode:400, data:'error update movie' }
    }

    async getMoviesWithUsers(){
        const movies = await this.movieRepository.find({relations:['users']})

        return movies ? { statusCode:200,data:movies } : { statusCode:404,data:[] }
    }

    async actorToMovie(movieId:number,actorId:number){
        const movie = await this.movieRepository.findOne(movieId,{relations:['actors']})
        const actor = await this.actorRepository.findOne(actorId)

        if( !movie ) return { statusCode:404,data:'movie not found' }
        if( !actor ) return { statusCode:404,data:'actor not found' }

        movie.actors.push(actor)
        await this.movieRepository.save(movie)

        return { statusCode:200,data:true }
    }
}
