import { Router } from 'express'
import { categoryRouter } from './category.router.js'
import { countryRouter } from './country.router.js'
import { imageRouter } from './image.router.js'
import { radioRouter } from './radio.router.js'
import { userRouter } from './user.router.js'
import { authRouter } from './auth.router.js'
import { authenticateAPI } from '../../middlewares/authenticate.api.js'

const routerApi = Router()

routerApi.use('/login', authRouter)
routerApi.use('/category', authenticateAPI, categoryRouter)
routerApi.use('/country', authenticateAPI, countryRouter)
routerApi.use('/image', authenticateAPI, imageRouter)
routerApi.use('/radio', authenticateAPI, radioRouter)
routerApi.use('/user', authenticateAPI, userRouter)

export default routerApi
