import { Router } from 'express'
import { showAll, showNew, save, showRemove, remove } from '../controllers/user.controller.js'
import { authorize } from '../middlewares/authorize.js'
import { Role } from '../models/user.js'

export const userRouter = Router()

userRouter.get('/', authorize(Role.ADMIN, Role.USER, Role.GUEST), showAll)
userRouter.get('/new', authorize(Role.ADMIN, Role.USER, Role.GUEST), showNew)
userRouter.post('/new', authorize(Role.ADMIN), save)
userRouter.get('/delete/:id', authorize(Role.ADMIN, Role.USER, Role.GUEST), showRemove)
userRouter.post('/delete/:id', authorize(Role.ADMIN), remove)
