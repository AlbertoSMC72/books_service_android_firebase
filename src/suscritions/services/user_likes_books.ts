import { UserLikesBooksRepository } from "../repositories/user_likes_books";

export class UserLikesBooksService {
    static async addLike(userId: number, bookId: number) {
        return await UserLikesBooksRepository.addLike(userId, bookId);
    }

    static async removeLike(userId: number, bookId: number) {
        return await UserLikesBooksRepository.removeLike(userId, bookId);
    }

    static async getLikesByBook(bookId: number) {
        return await UserLikesBooksRepository.getLikesByBook(bookId);
    }
}
