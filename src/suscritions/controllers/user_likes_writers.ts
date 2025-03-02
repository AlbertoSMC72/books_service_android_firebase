import { Request, Response } from "express";
import { UserLikesWritersService } from "../services/user_likes_writers";

export class UserLikesWritersController {
    static async  subscribeUser(req: Request, res: Response) {
        try {
            const { userId, writerId } = req.body;
            const result = await UserLikesWritersService.subscribeUser(userId, writerId);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: "Error al suscribirse al escritor" });
        }
    }

    static async unsubscribeUser(req: Request, res: Response) {
        try {
            const { userId, writerId } = req.body;
            const result = await UserLikesWritersService.unsubscribeUser(userId, writerId);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar suscripción al escritor" });
        }
    }

    static async getUserSubscriptions(req: Request, res: Response) {
        try {
            const userId = parseInt(req.params.userId);
            const result = await UserLikesWritersService.getUserSubscriptions(userId);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener escritores seguidos" });
        }
    }
}
