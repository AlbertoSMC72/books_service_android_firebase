import { Router } from "express";
import { ChapterController } from "../controllers/chapterController";

const router = Router();

router.get("/chapter/:id", ChapterController.getChapterById);
router.get("/chapters", ChapterController.getAllChapters);
router.post("/chapter", ChapterController.createChapter);
router.put("/chapter/:id", ChapterController.updateChapter);
router.delete("/chapter/:id", ChapterController.deleteChapter);
router.get("/book/:id", ChapterController.getChaptersByBookId);

export default router;