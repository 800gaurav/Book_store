import express from 'express';

import { usesing } from '../middleware/userMiddleware.js';
import { bookController, deletbookController, getallbookController, getallrecbookController, getsinglebookController, updatebookcontroller} from '../controller/bookController.js';

const router = express.Router();

router.post("/add-book", usesing, bookController)
router.put("/update-book", usesing, updatebookcontroller)
router.delete("/delete-book", usesing, deletbookController)
router.get("/get-all-book", getallbookController)
router.get("/get-all-rec-book", getallrecbookController)
router.get("/get-single-book/:id", getsinglebookController)


export default router;