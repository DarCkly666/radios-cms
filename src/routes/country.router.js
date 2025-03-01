import { Router } from 'express'
import { showAllList, showById, showNew, showUpdate, showRemove, save, update, remove } from '../controllers/country.controller.js'

export const countryRouter = Router()

countryRouter.get('/', showAllList)
countryRouter.get('/new', showNew)
countryRouter.post('/', save)
countryRouter.get('/edit/:id', showUpdate)
countryRouter.post('/edit/:id', update)
countryRouter.get('/delete/:id', showRemove)
countryRouter.post('/delete/:id', remove)
countryRouter.get('/:id', showById)
