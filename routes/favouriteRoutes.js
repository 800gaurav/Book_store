import express from 'express'
import { usesing } from '../middleware/userMiddleware.js'
import { addBookFav, getBookFav, removeBookFav } from '../controller/favController.js'

const router = express.Router()

router.put('/add-book-fav', usesing, addBookFav)
router.put('/delet-book-fav', usesing, removeBookFav)
router.get('/get-fav-book', usesing, getBookFav)

export default router