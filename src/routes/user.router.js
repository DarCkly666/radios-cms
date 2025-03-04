import { Router } from 'express'
import { showAll, showNew, save, showRemove, remove } from '../controllers/user.controller.js'

export const userRouter = Router()

userRouter.get('/', showAll)
userRouter.get('/new', showNew)
userRouter.post('/new', save)
userRouter.get('/delete/:id', showRemove)
userRouter.post('/delete/:id', remove)
