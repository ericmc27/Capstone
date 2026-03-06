import express from 'express'
import {checkUserAuthenication, checkUserSession, getProductsByCategory } from '../controllers/apiController'

export const apiRouter = express.Router()

apiRouter.use(checkUserAuthenication)
apiRouter.get('/check-user-session', checkUserSession)
apiRouter.get('/products/category/:category', getProductsByCategory)