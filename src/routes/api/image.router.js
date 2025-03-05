import { Router } from 'express'
import { upload } from '../../config/storage.js'
import { getAll, getById, create, remove } from '../../controllers/api/image.controller.js'

export const imageRouter = Router()

imageRouter.get('/', getAll)
imageRouter.get('/:id', getById)
imageRouter.post('/', upload('image'), create)
imageRouter.delete('/:id', remove)
