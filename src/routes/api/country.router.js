import { Router } from 'express'
import { getAll, getById, create, update, remove } from '../../controllers/api/country.controller.js'
import { authorizeAPI } from '../../middlewares/authorize.api.js'
import { Role } from '../../models/user.js'

export const countryRouter = Router()

countryRouter.get('/', authorizeAPI(Role.ADMIN, Role.USER, Role.GUEST), getAll)
countryRouter.get('/:id', authorizeAPI(Role.ADMIN, Role.USER, Role.GUEST), getById)
countryRouter.post('/', authorizeAPI(Role.ADMIN, Role.USER), create)
countryRouter.put('/:id', authorizeAPI(Role.ADMIN, Role.USER), update)
countryRouter.delete('/:id', authorizeAPI(Role.ADMIN, Role.USER), remove)
