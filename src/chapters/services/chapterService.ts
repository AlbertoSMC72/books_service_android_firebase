import { ChapterRepository } from '../repositories/chapterRepository';

export class ChapterService {
    static async getChapterById(chapterId: number) {
        return await ChapterRepository.getChapterById(chapterId);
    }

    static async getAllChapters() {
        return await ChapterRepository.getAllChapters();
    }

    static async createChapter(title: string, content: string, bookId: number) {
        return await ChapterRepository.createChapter(title, content, bookId);
    }

    static async updateChapter(bookId: number, title: string, content: string) {
        return await ChapterRepository.updateChapter(bookId, title, content);
    }
    
    static async deleteChapter(chapterId: number) {
        return await ChapterRepository.deleteChapter(chapterId);
    }

    static async getChaptersByBookId(bookId: number) {
        return await ChapterRepository.getChaptersByBookId(bookId);
    }
}