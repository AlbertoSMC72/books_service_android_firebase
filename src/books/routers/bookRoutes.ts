import { Router } from "express";
import { BookController } from "../controllers/bookController";

const router = Router();

router.get("/:id", BookController.getBook);
router.get("/", BookController.getAllBooks);
router.post("/", BookController.createBook);
router.put("/:id", BookController.updateBook);
router.delete("/:id", BookController.deleteBook);
router.get("/author/:id", BookController.getBooksByAuthor);
router.get("/genre/:id", BookController.getBooksByGenre);

export default router;