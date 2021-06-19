import {getRepository} from "typeorm";
import {User} from "../entity/User";
const jwt = require('jsonwebtoken');

export class AuthController{
    private userRepository = getRepository(User);

    async login(params:any){
        const user = await this.userRepository.findOne({email:params.email,password:params.password})

        if(!user)
            return { statusCode:404, data:[] }

        const token = jwt.sign({
            id:user.id,
            user:user,
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
        },'someString')

        return { statusCode:200,data:{token:token,user:user} }
    }
}
