import { Router } from 'express'
import { getRadios, showSave, save, showEdit, edit, showRemove, remove, showById } from '../../controllers/web/radio.controller.js'
import { authorize } from '../../middlewares/authorize.js'
import { Role } from '../../models/user.js'

export const radioRouter = Router()

radioRouter.get('/', authorize(Role.ADMIN, Role.USER, Role.GUEST), getRadios)
radioRouter.get('/new', authorize(Role.ADMIN, Role.USER, Role.GUEST), showSave)
radioRouter.post('/new', authorize(Role.ADMIN, Role.USER), save)
radioRouter.get('/edit/:id', authorize(Role.ADMIN, Role.USER, Role.GUEST), showEdit)
radioRouter.post('/edit/:id', authorize(Role.ADMIN, Role.USER), edit)
radioRouter.get('/delete/:id', authorize(Role.ADMIN, Role.USER, Role.GUEST), showRemove)
radioRouter.post('/delete/:id', authorize(Role.ADMIN, Role.USER), remove)
radioRouter.get('/:id', authorize(Role.ADMIN, Role.USER, Role.GUEST), showById)
