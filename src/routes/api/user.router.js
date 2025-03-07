import { Router } from 'express'
import { getAll, getById, create, update, remove } from '../../controllers/api/user.controller.js'
import { authorizeAPI } from '../../middlewares/authorize.api.js'
import { Role } from '../../models/user.js'

export const userRouter = Router()

userRouter.get('/', authorizeAPI(Role.ADMIN, Role.USER, Role.GUEST), getAll)
userRouter.get('/:id', authorizeAPI(Role.ADMIN, Role.USER, Role.GUEST), getById)
userRouter.post('/', authorizeAPI(Role.ADMIN), create)
userRouter.put('/:id', authorizeAPI(Role.ADMIN), update)
userRouter.delete('/:id', authorizeAPI(Role.ADMIN), remove)
