import { Router } from 'express'
import { showAll, showNew, save } from '../controllers/image.controller.js'
import { upload } from '../config/storage.js'

export const imageRouter = Router()

imageRouter.get('/', showAll)
imageRouter.get('/new', showNew)
imageRouter.post('/new', upload('image'), save)
