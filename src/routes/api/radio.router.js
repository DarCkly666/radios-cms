import { Router } from 'express'
import { getAll, getById, create, update, remove } from '../../controllers/api/radio.controller.js'

export const radioRouter = Router()

radioRouter.get('/', getAll)
radioRouter.get('/:id', getById)
radioRouter.post('/', create)
radioRouter.put('/:id', update)
radioRouter.delete('/:id', remove)
