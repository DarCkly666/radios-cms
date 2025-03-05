import { Router } from 'express'
import { getAll, getById, create, update, remove } from '../../controllers/api/category.controller.js'

export const categoryRouter = Router()

categoryRouter.get('/', getAll)
categoryRouter.get('/:id', getById)
categoryRouter.post('/', create)
categoryRouter.put('/:id', update)
categoryRouter.delete('/:id', remove)
