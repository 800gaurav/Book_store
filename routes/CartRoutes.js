import express from 'express'
import { usesing } from '../middleware/userMiddleware.js'
import { addBookcart, getBookcart, removeBookcart } from '../controller/cartCotroller.js'

const router = express.Router()

router.put('/add-book-cart', usesing, addBookcart)
router.put('/remove-book-cart/:bookid', usesing, removeBookcart)
router.get('/get-book-cart', usesing, getBookcart)


export default router