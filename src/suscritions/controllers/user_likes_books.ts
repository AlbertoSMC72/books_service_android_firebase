import { Request, Response } from "express";
import { UserLikesBooksService } from "../services/user_likes_books";

export class UserLikesBooksController {
    static async addLike(req: Request, res: Response) {
        try {
            const { userId, bookId } = req.body;
            const result = await UserLikesBooksService.addLike(userId, bookId);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: "Error al dar like al libro" });
        }
    }

    static async removeLike(req: Request, res: Response) {
        try {
            const { userId, bookId } = req.body;
            const result = await UserLikesBooksService.removeLike(userId, bookId);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: "Error al quitar like del libro" });
        }
    }

    static async getLikesByBook(req: Request, res: Response) {
        try {
            const bookId = parseInt(req.params.bookId);
            const result = await UserLikesBooksService.getLikesByBook(bookId);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los likes del libro" });
        }
    }
}
