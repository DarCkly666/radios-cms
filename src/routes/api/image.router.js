import { Router } from 'express'
import { upload } from '../../config/storage.js'
import { getAll, getById, create, remove } from '../../controllers/api/image.controller.js'
import { authorizeAPI } from '../../middlewares/authorize.api.js'
import { Role } from '../../models/user.js'

export const imageRouter = Router()

imageRouter.get('/', authorizeAPI(Role.ADMIN, Role.USER, Role.GUEST), getAll)
imageRouter.get('/:id', authorizeAPI(Role.ADMIN, Role.USER, Role.GUEST), getById)
imageRouter.post('/', authorizeAPI(Role.ADMIN, Role.USER), upload('image'), create)
imageRouter.delete('/:id', authorizeAPI(Role.ADMIN, Role.USER), remove)
