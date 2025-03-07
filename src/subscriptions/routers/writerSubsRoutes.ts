import { Router } from "express";
import { UserSubscriptionController } from "../controllers/writerSubsController";

const router = Router();

router.post("/user/subscribe", UserSubscriptionController.subscribe);
router.post("/user/unsubscribe", UserSubscriptionController.unsubscribe);
router.get("/:userId", UserSubscriptionController.getWriterSubscriptionsByUser);

export default router;
    