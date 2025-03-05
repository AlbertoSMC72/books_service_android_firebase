import { Router } from "express";
import { ChapterController } from "../controllers/chapterController";

const router = Router();

router.get("/:id", ChapterController.getChapterById);
router.get("/", ChapterController.getAllChapters);
router.post("/", ChapterController.createChapter);
router.put("/:id", ChapterController.updateChapter);
router.delete("/:id", ChapterController.deleteChapter);
router.get("/book/:id", ChapterController.getChaptersByBookId);

export default router;