import { Router } from 'express'
import { getAll, getById, create, save, update, deleteById, edit, remove } from '../controllers/category.controller.js'
import { authorize } from '../middlewares/authorize.js'
import { Role } from '../models/user.js'

export const categoryRouter = Router()

categoryRouter.get('/', authorize(Role.ADMIN, Role.USER, Role.GUEST), getAll)
categoryRouter.get('/new', authorize(Role.ADMIN, Role.USER, Role.GUEST), create)
categoryRouter.post('/', authorize(Role.ADMIN, Role.USER), save)
categoryRouter.get('/edit/:id', authorize(Role.ADMIN, Role.USER, Role.GUEST), edit)
categoryRouter.post('/edit/:id', authorize(Role.ADMIN, Role.USER), update)
categoryRouter.get('/delete/:id', authorize(Role.ADMIN, Role.USER, Role.GUEST), remove)
categoryRouter.post('/delete/:id', authorize(Role.ADMIN, Role.USER), deleteById)
categoryRouter.get('/:id', authorize(Role.ADMIN, Role.USER, Role.GUEST), getById)
