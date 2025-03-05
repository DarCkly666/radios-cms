import { Router } from 'express'
import { showAllList, showById, showNew, showUpdate, showRemove, save, update, remove } from '../controllers/country.controller.js'
import { authorize } from '../middlewares/authorize.js'
import { Role } from '../models/user.js'

export const countryRouter = Router()

countryRouter.get('/', authorize(Role.ADMIN, Role.USER, Role.GUEST), showAllList)
countryRouter.get('/new', authorize(Role.ADMIN, Role.USER, Role.GUEST), showNew)
countryRouter.post('/', authorize(Role.ADMIN, Role.USER), save)
countryRouter.get('/edit/:id', authorize(Role.ADMIN, Role.USER, Role.GUEST), showUpdate)
countryRouter.post('/edit/:id', authorize(Role.ADMIN, Role.USER), update)
countryRouter.get('/delete/:id', authorize(Role.ADMIN, Role.USER, Role.GUEST), showRemove)
countryRouter.post('/delete/:id', authorize(Role.ADMIN, Role.USER), remove)
countryRouter.get('/:id', authorize(Role.ADMIN, Role.USER, Role.GUEST), showById)
