import { Router } from "express";
import { UserSubscriptionController } from "../controllers/writerSubsController";

const router = Router();

router.post("/user/subscribe", UserSubscriptionController.subscribe);
router.post("/user/unsubscribe", UserSubscriptionController.unsubscribe);
router.get("/:userId", UserSubscriptionController.getWriterSubscriptionsByUser);
router.get("/user/:userId/writer/:writerId/isSubscribed", async (req, res) => {
    try {
        await UserSubscriptionController.isSubscribed(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


export default router;
    