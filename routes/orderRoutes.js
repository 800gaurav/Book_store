import express from 'express'
import { usesing } from '../middleware/userMiddleware.js'
import { getallorderController, getorderHistoryController, placeOrderController, updataallorderController } from '../controller/orderController.js'
const router = express.Router()

router.post('/order-placed', usesing, placeOrderController)
router.get('/get-order-history',usesing, getorderHistoryController)
router.get('/get-all-order',usesing, getallorderController)
router.put('/update-order', usesing, updataallorderController)

export default router