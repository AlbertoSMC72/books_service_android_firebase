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
        // Creación del libro
        const respuesta = await BookRepository.createBook(title, description, authorId, genreIds);
    
        // Enviar notificaciones a los usuarios que han indicado que les gusta este escritor
        try {
            const users = await getUsersWhoLikedWriter(authorId);
            await Promise.all(users.map(async (user) => {
                console.log(user);
                await NotificationService.sendPushNotification(
                    user,
                    'Nuevo Libro!',
                    `Un autor que te gusta ha publicado un nuevo libro "${title}"`
                );
            }));
        } catch (error) {
            console.error('Error al enviar notificaciones:', error);
        }
    
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