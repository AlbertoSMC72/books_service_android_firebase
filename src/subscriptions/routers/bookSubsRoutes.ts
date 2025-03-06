import { Router } from "express";
import { BookSubscriptionController } from "../controllers/bookSubsController";

const router = Router();

router.post("/sub", BookSubscriptionController.subcribe);
router.post("/unsub", BookSubscriptionController.unsubscribe);
router.get("/:userId", BookSubscriptionController.getUserBookSubscriptions);

export default router;
