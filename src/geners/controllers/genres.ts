import { Request, Response } from "express";
import { GenreService } from "../services/genres";

export class GenreController {
    static async createGenre(req: Request, res: Response) {
        try {
            const { name } = req.body;
            const result = await GenreService.createGenre(name);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: "Error al crear el género" });
        }
    }

    static async getAllGenres(req: Request, res: Response) {
        try {
            const result = await GenreService.getAllGenres();
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los géneros" });
        }
    }

    static async addUserFavoriteGenre(req: Request, res: Response) {
        try {
            const { userId, genreId } = req.body;
            const result = await GenreService.addUserFavoriteGenre(userId, genreId);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: "Error al añadir género a favoritos" });
        }
    }

    static async addBookGenre(req: Request, res: Response) {
        try {
            const { bookId, genreId } = req.body;
            const result = await GenreService.addBookGenre(bookId, genreId);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: "Error al asociar género al libro" });
        }
    }
}
