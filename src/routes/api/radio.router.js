import { Router } from 'express'
import { getAll, getById, create, update, remove } from '../../controllers/api/radio.controller.js'
import { authorizeAPI } from '../../middlewares/authorize.api.js'
import { Role } from '../../models/user.js'

export const radioRouter = Router()

radioRouter.get('/', authorizeAPI(Role.ADMIN, Role.USER, Role.GUEST), getAll)
radioRouter.get('/:id', authorizeAPI(Role.ADMIN, Role.USER, Role.GUEST), getById)
radioRouter.post('/', authorizeAPI(Role.ADMIN, Role.USER), create)
radioRouter.put('/:id', authorizeAPI(Role.ADMIN, Role.USER), update)
radioRouter.delete('/:id', authorizeAPI(Role.ADMIN, Role.USER), remove)
