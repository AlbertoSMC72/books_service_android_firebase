import {Router} from "express";
import { UserController } from "../controllers/users";

const router = Router();

router.post("/", UserController.createUser)
router.get("/:id", UserController.getUser)
router.put("/:id", UserController.updateUser)
router.delete("/:id", UserController.deleteUser)
router.post("/login", UserController.login)

export default router;
