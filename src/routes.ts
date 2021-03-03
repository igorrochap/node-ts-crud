import { Router } from "express"
import { UserController } from './controller/UserController';

const router = Router()
const userController = new UserController()

router.post('/user', userController.create)
router.get('/user', userController.index)
router.put('/user/:id', userController.update)
router.delete('/user/:id', userController.delete)

export { router }
