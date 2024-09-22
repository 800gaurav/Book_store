import express from "express";
const router = express.Router();
import {
  deleteuserController,
  getsingleUserController,
  getuserController,
  logincontroller,
  registerController,
  updateuserController,
} from "../controller/authController.js";
import { usesing } from "../middleware/userMiddleware.js";

router.post("/login", logincontroller);
router.post("/register", registerController);
router.get("/get-users", getuserController);
router.get("/get-single-users",usesing, getsingleUserController);
router.delete("/delet-users/:id", deleteuserController);
router.put("/update-users",usesing, updateuserController);

export default router;
