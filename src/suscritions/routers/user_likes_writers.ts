import { Router } from "express";
import { UserLikesWritersController } from "../controllers/user_likes_writers";

const router = Router();

router.post("/subscribe", UserLikesWritersController.subscribeUser);
router.post("/unsubscribe", UserLikesWritersController.unsubscribeUser);
router.get("/:userId", UserLikesWritersController.getUserSubscriptions);

export default router;
