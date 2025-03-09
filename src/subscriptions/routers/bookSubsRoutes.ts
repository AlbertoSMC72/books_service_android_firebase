import { Router } from "express";
import { BookSubscriptionController } from "../controllers/bookSubsController";

const router = Router();

router.post("/book/subscribe", BookSubscriptionController.subcribe);
router.post("/book/unsubscribe", BookSubscriptionController.unsubscribe);
router.get("/:userId", BookSubscriptionController.getUserBookSubscriptions);
router.get("/user/:userId/book/:bookId/isSubscribed", async (req, res) => {
    try {
        await BookSubscriptionController.isSubscribed(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
export default router;
