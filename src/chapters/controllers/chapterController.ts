import { Request, Response } from "express";
import { ChapterService } from "../services/chapterService";

export class ChapterController {

    static async getChapterById(req: Request, res: Response) : Promise<void>{
        try {
            const chapterId = parseInt(req.params.id);
            const chapter = await ChapterService.getChapterById( chapterId );
            if (!chapter) {
                res.status(404).json({ message: "Episodio no encontrado" });
                return
            }
            res.json(chapter);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener el pisodio" });
        }
    }

    static async getAllChapters(req: Request, res: Response) : Promise<void>{
        try {
            const chapters = await ChapterService.getAllChapters();
            if (!chapters) {
                res.status(404).json({ message: "Episodios no encontrados" });
                return
            }
            res.json(chapters);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los Episodios" });
        }
    }

    static async createChapter(req: Request, res: Response): Promise<void> {
        try {
            const { title, content, bookId } = req.body;
            if (!title || !content || !bookId ) {
                res.status(400).json({ message: "Datos incompletos" });
                return;
            }
            const chapterId = await ChapterService.createChapter(title, content, bookId);
            res.status(201).json({ message: "Episodio creado", chapterId });
        } catch (error) {
            res.status(500).json({ error: "Error al crear el Episodio" });
        }
    }
    

    static async updateChapter(req: Request, res: Response): Promise<void> {
        try {
            const chapterId = parseInt(req.params.id);
            const { title, content } = req.body;
    
            if (!title || !content) {
                res.status(400).json({ message: "Datos incompletos" });
                return;
            }
    
            const success = await ChapterService.updateChapter(chapterId, title, content);
    
            if (!success) {
                res.status(404).json({ message: "Episodio no encontrado" });
                return;
            }
    
            res.json({ message: "Episodio actualizado exitosamente" });
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar el Episodio" });
        }
    }
    

    static async deleteChapter(req: Request, res: Response) : Promise<void>{
        try {
            const chapterId = parseInt(req.params.id);
            const success = await ChapterService.deleteChapter( chapterId );
            if (!success) {
                res.status(404).json({ message: "Episodio no encontrado" });
                return
            }
            res.json({ message: "Episodio eliminado exitosamente" });
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar el Episodio" });
        }
    }

    static async getChaptersByBookId(req: Request, res: Response) : Promise<void>{
        try {
            const bookId = parseInt(req.params.id);
            const chapters = await ChapterService.getChaptersByBookId( bookId );
            if (!chapters) {
                res.status(404).json({ message: "Episodios no encontrados" });
                return
            }
            res.json(chapters);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los Episodios" });
        }
    }
}
