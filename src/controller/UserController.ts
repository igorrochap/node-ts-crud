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
}

export { UserController }
