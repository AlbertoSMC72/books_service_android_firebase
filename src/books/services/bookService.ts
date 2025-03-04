import { BookRepository } from '../repositories/bookRepository';

export class BookService {
    static async getBookById(bookId: number) {
        return await BookRepository.getBookById(bookId);
    }

    static async getAllBooks() {
        return await BookRepository.getAllBooks();
    }

    static async createBook(title: string, description: string, authorId: number, genreIds: number[]) {
        return await BookRepository.createBook(title, description, authorId, genreIds);
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