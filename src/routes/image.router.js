import { Router } from 'express'
import { showAll, showNew, save, showRemove, remove } from '../controllers/image.controller.js'
import { upload } from '../config/storage.js'
import { authorize } from '../middlewares/authorize.js'
import { Role } from '../models/user.js'

export const imageRouter = Router()

imageRouter.get('/', authorize(Role.ADMIN, Role.USER, Role.GUEST), showAll)
imageRouter.get('/new', authorize(Role.ADMIN, Role.USER, Role.GUEST), showNew)
imageRouter.post('/new', authorize(Role.ADMIN, Role.USER), upload('image'), save)
imageRouter.get('/delete/:id', authorize(Role.ADMIN, Role.USER, Role.GUEST), showRemove)
imageRouter.post('/delete/:id', authorize(Role.ADMIN, Role.USER), remove)
