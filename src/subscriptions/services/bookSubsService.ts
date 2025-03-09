import { BookSubscriptionRepository } from "../repositories/bookSubsRepository";
import { NotificationService } from "../../notifications/notifcation";
import { getWriterTokenByBook } from "../../notifications/repository/getTokenUsers";

export class BookSubscriptionService {
    static async subscribe(userId: number, bookId: number) {
        const result = await BookSubscriptionRepository.subscribe(userId, bookId);
        if (result) {
            const writer = await getWriterTokenByBook(bookId);
            if (writer) {
                const title = "Nuevo like a tu libro";
                const body = `¡tu libro ha recibido un nuevo like!`;
                await NotificationService.sendPushNotification(writer, title, body);
            }
        }
        return result
    }

    static async unsubscribe(userId: number, bookId: number) {
        return await BookSubscriptionRepository.unsubscribe(userId, bookId);
    }

    static async getBookSubscriptionsByUser(userId: number) {
        return await BookSubscriptionRepository.getBookSubscriptionsByUser(userId);
    }

    static async isSubscribed(userId: number, bookId: number) {
        return await BookSubscriptionRepository.isSubscribed(userId, bookId);
    }
}
