import { BookRepository } from '../repositories/bookRepository';
import { getUsersWhoLikedWriter } from '../../notifications/repository/getTokensUsersLikesWriters';
import { NotificationService } from "../../notifications/notifcation";

export class BookService {
    static async getBookById(bookId: number) {
        return await BookRepository.getBookById(bookId);
    }

    static async getAllBooks() {
        return await BookRepository.getAllBooks();
    }

    static async createBook(title: string, description: string, authorId: number, genreIds: number[]) {
        const respuesta = await BookRepository.createBook(title, description, authorId, genreIds);

        getUsersWhoLikedWriter(authorId).then((users) => {
            users.forEach((user) => {
                console.log(user)
                NotificationService.sendPushNotification(user, 'Nuevo Libro!', `Un autor que te gusta ha publicado un nuevo libro "${title}"`);
            });
        });

        return respuesta;
    }

    static async updateBook(bookId: number, title: string, description: string, genreIds?: number[]) {
        return await BookRepository.updateBook(bookId, title, description, genreIds);
    }

    static async deleteBook(bookId: number) {
        return await BookRepository.deleteBook(bookId);
    }

    static async getBooksByAuthor(authorId: number) {
        return await BookRepository.getBooksByAuthor(authorId);
    }

    static async getBooksByGenre(genreId: number) {
        return await BookRepository.getBooksByGenre(genreId);
    }
}