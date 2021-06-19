import {Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,UpdateDateColumn,ManyToMany,JoinTable} from "typeorm";
import {Movie} from "./Movie";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique:true,
    })
    email:string

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column({
        select:false
    })
    password:string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToMany(() => Movie, movie => movie.users)
    @JoinTable()
    movies: Movie[];
}
