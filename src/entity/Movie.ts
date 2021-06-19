import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToMany,
    OneToOne,
    JoinColumn,
} from "typeorm";
import {User} from "./User";
import {Actor} from "./Actor";
import {Category} from "./Category";

@Entity()
export class Movie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique:true,
    })
    name: string;

    @Column()
    age: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @ManyToMany(() => User, user => user.movies)
    users: User[];

    @ManyToMany(() => Actor, actor => actor.movies)
    actors: Actor[];

    @OneToOne(() => Category)
    @JoinColumn()
    category: Category;
}
