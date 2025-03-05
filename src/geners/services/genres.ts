import { GenreRepository } from "../repositories/genres";

export class GenreService {
    static async createGenre(name: string) {
        return await GenreRepository.createGenre(name);
    }

    static async getAllGenres() {
        return await GenreRepository.getAllGenres();
    }

    static async addUserFavoriteGenre(userId: number, genreId: number) {
        return await GenreRepository.addUserFavoriteGenre(userId, genreId);
    }

    static async addBookGenre(bookId: number, genreId: number) {
        return await GenreRepository.addBookGenre(bookId, genreId);
    }
}
