import { Request, Response } from "express";
import { BookService } from "../services/bookService";

export class BookController {

    static async getBook(req: Request, res: Response) : Promise<void>{
        try {
            const bookId = parseInt(req.params.id);
            const book = await BookService.getBookById( bookId );
            if (!book) {
                res.status(404).json({ message: "Libro no encontrado" });
                return
            }
            res.json(book);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener el libro" });
        }
    }

    static async getAllBooks(req: Request, res: Response) : Promise<void>{
        try {
            const books = await BookService.getAllBooks();
            if (!books) {
                res.status(404).json({ message: "Libros no encontrados" });
                return
            }
            res.json(books);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los libros" });
        }
    }

    static async createBook(req: Request, res: Response): Promise<void> {
        try {
            const { title, description, authorId, genreIds } = req.body;
            if (!title || !description || !authorId || !Array.isArray(genreIds)) {
                res.status(400).json({ message: "Datos incompletos" });
                return;
            }
            const bookId = await BookService.createBook(title, description, authorId, genreIds);
            res.status(201).json({ message: "Libro creado", bookId });
        } catch (error) {
            res.status(500).json({ error: "Error al crear el libro" });
        }
    }
    

    static async updateBook(req: Request, res: Response): Promise<void> {
        try {
            const bookId = parseInt(req.params.id);
            const { title, description, genreIds } = req.body;
    
            if (!title || !description) {
                res.status(400).json({ message: "Datos incompletos" });
                return;
            }
    
            const success = await BookService.updateBook(bookId, title, description, genreIds);
    
            if (!success) {
                res.status(404).json({ message: "Libro no encontrado" });
                return;
            }
    
            res.json({ message: "Libro actualizado exitosamente" });
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar el libro" });
        }
    }
    

    static async deleteBook(req: Request, res: Response) : Promise<void>{
        try {
            const bookId = parseInt(req.params.id);
            const success = await BookService.deleteBook( bookId );
            if (!success) {
                res.status(404).json({ message: "Libro no encontrado" });
                return
            }
            res.json({ message: "Libro eliminado exitosamente" });
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar el libro" });
        }
    }

    static async getBooksByAuthor(req: Request, res: Response) : Promise<void>{
        try {
            const authorId = parseInt(req.params.id);
            const books = await BookService.getBooksByAuthor( authorId );
            if (!books) {
                res.status(404).json({ message: "Libros no encontrados" });
                return
            }
            res.json(books);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los libros" });
        }
    }

    static async getBooksByGenre(req: Request, res: Response) : Promise<void>{      
        try {
            const genreId = parseInt(req.params.id);
            const books = await BookService.getBooksByGenre( genreId );
            if (!books) {
                res.status(404).json({ message: "Libros no encontrados" });
                return
            }
            res.json(books);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los libros" });
        }
    }
}
