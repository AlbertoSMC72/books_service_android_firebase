import { Router } from "express";
import { GenreController } from "../controllers/genres";

const router = Router();

router.post("/", GenreController.createGenre);
router.get("/all", GenreController.getAllGenres);
router.post("/user-fav", GenreController.addUserFavoriteGenre);
router.post("/book-genre", GenreController.addBookGenre);

export default router;
