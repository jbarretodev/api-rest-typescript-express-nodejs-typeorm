import {getRepository} from "typeorm"
import {User} from "../entity/User"
import {sendMailWelcome} from "../utils/utils";

export class UserController {

    private userRepository = getRepository(User);

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
}
