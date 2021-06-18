import {getRepository} from "typeorm";
import {Movie} from "../entity/Movie";


export class MovieController{
    private movieRepository = getRepository(Movie);

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
}
