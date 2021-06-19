import {getRepository} from "typeorm";
import {Actor} from "../entity/Actor";

export class ActorController{
    private actorRepository = getRepository(Actor);

    async getAllActors(){
        const actors = await this.actorRepository.find()
        return actors.length > 0 ? { statusCode:200,data:actors } : { statusCode:404,data:[] }
    }

    async getOneActor(id:number){
        const actor = await this.actorRepository.findOne(id)
        return actor ? { statusCode:200,data:actor } : { statusCode:404,data:[] }
    }

    async saveActor(params:any){
        try{
            const actor = await this.actorRepository.save(params)
            return actor ? { statusCode:201,data:actor } : { statusCode:400,data:'error saving users' }
        }catch (e) {
            return { statusCode:400,data:e.message }
        }
    }

    async updateActor(params:any,id:number){
        const actor = await this.actorRepository.findOne(id)

        if(!actor) return { statusCode:404,data:[] }

        return (await this.actorRepository.update(id,params)) ? { statusCode:200,data:true } : { statusCode:400,data:'error updating users' }
    }

    async deleteActor(id:number){
        const actor = await this.actorRepository.findOne(id)

        if(!actor) return { statusCode:404,data:[] }

        return (await this.actorRepository.remove(actor)) ? { statusCode:200,data:true } : { statusCode:400,data:'error deleting users' }
    }
}
