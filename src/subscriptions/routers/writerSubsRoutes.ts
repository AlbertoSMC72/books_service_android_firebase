import { Router } from "express";
import { UserSubscriptionController } from "../controllers/writerSubsController";

const router = Router();

router.post("/subscribe", UserSubscriptionController.subscribe);
router.post("/unsubscribe", UserSubscriptionController.unsubscribe);
router.get("/:userId", UserSubscriptionController.getWriterSubscriptionsByUser);

export default router;
