import { Request, Response } from 'express'
import {getCustomRepository} from "typeorm";
import {UserRepository} from "../repository/UserRepository";

class UserController {

    public async create(req: Request, res: Response) {
        const userRepository = getCustomRepository(UserRepository)

        const { name, age, email } = req.body

        if(await userRepository.alreadyExists(email)) {
            return res.status(400).json({
                message: "Email already in use"
            })
        }

        const user = userRepository.create({
            name, age, email
        })

        await userRepository.save(user)

        return res.status(200).json({
            message: "Created successfuly",
            data: user
        })
    }

    public async index(req: Request, res: Response) {
        const userRepository = getCustomRepository(UserRepository)

        const users = await userRepository.find()

        return res.status(200).json({
            data: users
        })
    }

    public async update(req: Request, res: Response) {
        const id = req.params.id
        const {name, email, age} = req.body
        const userRepository = getCustomRepository(UserRepository)

        const user = await userRepository.findOne(id)

        user.name = name ? name : user.name
        user.email = email ? email : user.email
        user.age = age ? age : user.age

        await userRepository.save(user)

        return res.status(200).json(user)
    }

    public async delete(req: Request, res: Response) {
        const id = req.params.id
        const userRepository = getCustomRepository(UserRepository)

        const user = await userRepository.findOne(id)

        await userRepository.remove(user)

        const users = await userRepository.find()
        return res.status(200).json({
            message: "Removed successfully",
            data: users
        })
    }
}

export { UserController }
