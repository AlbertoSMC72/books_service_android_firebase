import { BookSubscriptionRepository } from "../repositories/bookSubsRepository";

export class BookSubscriptionService {
    static async subscribe(userId: number, bookId: number) {
        return await BookSubscriptionRepository.subscribe(userId, bookId);
    }

    static async unsubscribe(userId: number, bookId: number) {
        return await BookSubscriptionRepository.unsubscribe(userId, bookId);
    }

    static async getBookSubscriptionsByUser(userId: number) {
        return await BookSubscriptionRepository.getBookSubscriptionsByUser(userId);
    }
}
