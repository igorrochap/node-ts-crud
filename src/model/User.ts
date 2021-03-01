import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("user")
class User {
    @PrimaryGeneratedColumn('increment')
    readonly id: number

    @Column()
    name: string

    @Column()
    age: number

    @Column()
    email: string

    @CreateDateColumn()
    created_at: Date
}

export { User }
