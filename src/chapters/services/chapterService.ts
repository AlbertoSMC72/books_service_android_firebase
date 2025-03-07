
import { ChapterRepository } from '../repositories/chapterRepository';
import { getUsersWhoLikedBook } from '../../notifications/repository/getTokensUsersLikesBooks';
import { NotificationService } from "../../notifications/notifcation";

export class ChapterService {
    static async getChapterById(chapterId: number) {
        return await ChapterRepository.getChapterById(chapterId);
    }

    static async getAllChapters() {
        return await ChapterRepository.getAllChapters();
    }

    static async createChapter(title: string, content: string, bookId: number) {
        const respuesta = await ChapterRepository.createChapter(title, content, bookId);

        getUsersWhoLikedBook(bookId).then((users) => {
            users.forEach((user) => {
                NotificationService.sendPushNotification(user, 'Nuevo capítulo!', `Se ha publicado un nuevo capítulo "${title}", de un libro que te gusta`);
            });
        });

        return respuesta;
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