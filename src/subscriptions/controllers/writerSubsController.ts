import { Request, Response } from "express";
import { WriterSubscriptionService } from "../services/writerSubsService";

export class UserSubscriptionController {
    static async subscribe(req: Request, res: Response) {
        try {
            const { userId, writerId } = req.body;
            await WriterSubscriptionService.subscribe(userId, writerId);
            res.json({ message: "Suscripción añadida correctamente" });
        } catch (error) {
            res.status(500).json({ error: "Error al suscribirse al escritor" });
        }
    }

    static async unsubscribe(req: Request, res: Response) {
        try {
            const { userId, writerId } = req.body;
            const result = await WriterSubscriptionService.unsubscribe(userId, writerId);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar suscripción al escritor" });
        }
    }

    static async getWriterSubscriptionsByUser(req: Request, res: Response) {
        try {
            const userId = parseInt(req.params.userId);
            const result = await WriterSubscriptionService.getBookSubscriptionsByUser(userId);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener escritores seguidos" });
        }
    }

    static async isSubscribed(req: Request, res: Response) {
            try {
                const userId = parseInt(req.params.userId);
                const writerId = parseInt(req.params.writerId);
                
                if (isNaN(userId) || isNaN(writerId)) {
                    return res.status(400).json({ error: "userId y writerId deben ser números válidos" });
                }
                
                const result = await WriterSubscriptionService.isSubscribed(userId, writerId);
                res.json(result);
            } catch (error) {
                res.status(500).json({ error: "Error al verificar la suscripción" });
            }
        }
}
