import express from 'express'
import {checkUserAuthenication, checkUserSession, createCheckoutSession, getProductsByCategory, storePayment } from '../controllers/apiController'
import { getProductsAdmin} from '../controllers/adminController'
import { isAdmin } from '../middleware/main'

export const apiRouter = express.Router()

apiRouter.use(checkUserAuthenication)
//Admin routes
apiRouter.get('/get-products', isAdmin, getProductsAdmin)






//Main routes
apiRouter.get('/check-user-session', checkUserSession)
apiRouter.post('/create-checkout-session', createCheckoutSession)
apiRouter.get('/products/category/:category', getProductsByCategory)

