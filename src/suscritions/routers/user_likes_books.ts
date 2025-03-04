import { Router } from "express";
import { UserLikesBooksController } from "../controllers/user_likes_books";

const router = Router();

router.post("/add", UserLikesBooksController.addLike);
router.post("/remove", UserLikesBooksController.removeLike);
router.get("/:bookId", UserLikesBooksController.getLikesByBook);

export default router;
