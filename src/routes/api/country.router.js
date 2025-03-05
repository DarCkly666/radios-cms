import { Router } from 'express'
import { getAll, getById, create, update, remove } from '../../controllers/api/country.controller.js'

export const countryRouter = Router()

countryRouter.get('/', getAll)
countryRouter.get('/:id', getById)
countryRouter.post('/', create)
countryRouter.put('/:id', update)
countryRouter.delete('/:id', remove)
