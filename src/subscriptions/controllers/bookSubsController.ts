import { Request, Response } from "express";
import { BookSubscriptionService } from "../services/bookSubsService";

export class BookSubscriptionController {

    static async subcribe(req: Request, res: Response) {
        try {
            const { userId, bookId } = req.body;
            const result = await BookSubscriptionService.subscribe(userId, bookId);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: "Error al dar subscribirse al libro" });
        }
    }

    static async unsubscribe(req: Request, res: Response) {
        try {
            const { userId, bookId } = req.body;
            const result = await BookSubscriptionService.unsubscribe(userId, bookId);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: "Error al des-subscribirse del libro" });
        }
    }

    static async getUserBookSubscriptions(req: Request, res: Response) {
        try {
            const userId = parseInt(req.params.userId);
            const result = await BookSubscriptionService.getBookSubscriptionsByUser(userId);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener las subscripciones del libro" });
        }
    }
}
