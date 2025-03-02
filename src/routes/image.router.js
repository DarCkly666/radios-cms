import { Router } from 'express'
import { showAll, showNew, save, showRemove, remove } from '../controllers/image.controller.js'
import { upload } from '../config/storage.js'

export const imageRouter = Router()

imageRouter.get('/', showAll)
imageRouter.get('/new', showNew)
imageRouter.post('/new', upload('image'), save)
imageRouter.get('/delete/:id', showRemove)
imageRouter.post('/delete/:id', remove)
