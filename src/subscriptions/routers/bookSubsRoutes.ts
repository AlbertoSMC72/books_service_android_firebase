import { Router } from "express";
import { BookSubscriptionController } from "../controllers/bookSubsController";

const router = Router();

router.post("/book/subscribe", BookSubscriptionController.subcribe);
router.post("/book/unsubscribe", BookSubscriptionController.unsubscribe);
router.get("/:userId", BookSubscriptionController.getUserBookSubscriptions);

export default router;
