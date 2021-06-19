import {getRepository} from "typeorm";
import {Category} from "../entity/Category";

export class CategoryController{
    private categoryRepository = getRepository(Category);

    async getAllCategories(){
        const categories = await this.categoryRepository.find()
        return categories.length > 0 ? { statusCode:200,data:categories } : { statusCode:404,data:[] }
    }

    async getOneCategory(id:number){
        const category = await this.categoryRepository.findOne(id)
        return category ? { statusCode:200,data:category } : { statusCode:404,data:[] }
    }

    async saveCategory(params:any){
        const category = await this.categoryRepository.save(params)
        return category ? { statusCode:201,data:category } : { statusCode:400,data:'error saving category' }
    }

    async updateCategory(id:number,params:any){
        const category = await this.categoryRepository.findOne(id)

        if(!category) return { statusCode:404,data:[] }

        return (await this.categoryRepository.update(id,params)) ? { statusCode:200,data:true } : { statusCode:400,data:'error updating category' }
    }

    async deleteCategory(id:number){
        const category = await this.categoryRepository.findOne(id)

        if(!category) return { statusCode:404,data:[] }

        return (await this.categoryRepository.remove(category)) ? { statusCode:200,data:true } : { statusCode:400,data:'error deleting category' }
    }
}
