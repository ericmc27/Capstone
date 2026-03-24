import express from 'express'
import {checkUserAuthenication, checkUserSession, createCheckoutSession, getProductsByCategory, storePayment } from '../controllers/apiController'

export const apiRouter = express.Router()

apiRouter.use(checkUserAuthenication)
apiRouter.get('/check-user-session', checkUserSession)
apiRouter.post('/create-checkout-session', createCheckoutSession)
apiRouter.get('/products/category/:category', getProductsByCategory)
// apiRouter.post('/storePayment/:session_id', storePayment)
