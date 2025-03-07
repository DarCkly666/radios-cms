import { Router } from 'express'
import { getAll, getById, create, update, remove } from '../../controllers/api/category.controller.js'
import { authorizeAPI } from '../../middlewares/authorize.api.js'
import { Role } from '../../models/user.js'

export const categoryRouter = Router()

categoryRouter.get('/', authorizeAPI(Role.ADMIN, Role.USER, Role.GUEST), getAll)
categoryRouter.get('/:id', authorizeAPI(Role.ADMIN, Role.USER, Role.GUEST), getById)
categoryRouter.post('/', authorizeAPI(Role.ADMIN, Role.USER), create)
categoryRouter.put('/:id', authorizeAPI(Role.ADMIN, Role.USER), update)
categoryRouter.delete('/:id', authorizeAPI(Role.ADMIN, Role.USER), remove)
