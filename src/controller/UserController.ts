import {getRepository} from "typeorm"
import {User} from "../entity/User"
import {removeMovieFromList, sendMailWelcome} from "../utils/utils";
import {Movie} from "../entity/Movie";

export class UserController {

    private userRepository = getRepository(User);
    private movieRepository = getRepository(Movie);

    async all() {
        const users = await this.userRepository.find({ relations: ["movies"] })
        return users.length > 0 ? { statusCode:200,data:users } : { statusCode:404,data:[] }
    }

    async one(id:number) {
        const rs = await this.userRepository.findOne(id)

        return (rs) ? { statusCode:200,data:rs } : { statusCode:404,data:[] }
    }

    async save(params:any) {
        try{
            const user  = await this.userRepository.save(params);
            if(user){
                sendMailWelcome(user.email)
                return { statusCode:201,data:user }
            }
            return { statusCode:400,data:'error savig user' }
        }catch (e) {
            return { statusCode:500,data:e.message }
        }
    }

    async remove(id:number) {
        let userToRemove = await this.userRepository.findOne(id);

        if(!userToRemove)
            return { statusCode:404,data:[] }

        return (await this.userRepository.remove(userToRemove)) ? { statusCode:200,data:true } : { statusCode:400,data:"error deleting user" }
    }

    async update(id:number,params:any){
        let user = await this.userRepository.findOne(id);

        if(!user)
            return { statusCode:404,data:[] }

        return (await this.userRepository.update(id,params)) ? { statusCode:200,data:true } : { statusCode:400,data:'error updating user' }
    }

    async setMovieAsFavorite(movieId:number,userId:number){
        const user = await this.userRepository.findOne(userId)
        const movie = await this.movieRepository.findOne(movieId, { relations: ["users"] });
        movie.users.push(user)
        await this.movieRepository.save(movie)
        return { statusCode:200,data:true }
    }

    async getMyFavoriteMovies(id:number){
        const user = await this.userRepository.findOne(id,{ relations: ["movies"] })

        return user.movies.length > 0 ? { statusCode:200,data:user.movies } : { statusCode:404,data:[] }
    }

    async removeMovie(userId,movieId:number){
        const user = await this.userRepository.findOne(userId,{ relations: ["movies"] })

        if(!user || user.movies.length <= 0) return { statusCode:400,data:'error no movies' }

        if(!user.movies.some(movie => movie.id === movieId)) return { statusCode:404,data:'error, no movies with that id' }

        user.movies = removeMovieFromList(user.movies,movieId)

        await this.userRepository.save(user)

        return { statusCode:200,data:true }
    }
}
