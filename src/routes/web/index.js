import { Router } from 'express'
import { categoryRouter } from './category.router.js'
import { countryRouter } from './country.router.js'
import { imageRouter } from './image.router.js'
import { radioRouter } from './radio.router.js'
import { routerMain } from './main.router.js'
import { userRouter } from './user.router.js'
import { loginRouter, logoutRouter } from './auth.router.js'
import { authenticate } from '../../middlewares/authenticate.js'

const routerWeb = Router()

routerWeb.use('/login', loginRouter)
routerWeb.use('/logout', authenticate, logoutRouter)
routerWeb.use('/', authenticate, routerMain)
routerWeb.use('/category', authenticate, categoryRouter)
routerWeb.use('/country', authenticate, countryRouter)
routerWeb.use('/image', authenticate, imageRouter)
routerWeb.use('/radio', authenticate, radioRouter)
routerWeb.use('/user', authenticate, userRouter)

export default routerWeb
