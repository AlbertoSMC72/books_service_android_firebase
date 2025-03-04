import { Router } from "express";
import { BookController } from "../controllers/bookController";

const router = Router();

router.get("/books/:id", BookController.getBook);
router.get("/books", BookController.getAllBooks);
router.post("/books", BookController.createBook);
router.put("/books/:id", BookController.updateBook);
router.delete("/books/:id", BookController.deleteBook);
router.get("/author/:id", BookController.getBooksByAuthor);
router.get("/genre/:id", BookController.getBooksByGenre);

export default router;