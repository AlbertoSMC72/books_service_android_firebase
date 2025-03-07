import { NotificationService } from "../../notifications/notifcation";
import { WriterSubscriptionRepository } from "../repositories/writerSubsRepository";
import { getUserToken } from "../../notifications/repository/getTokenUsers";

export class WriterSubscriptionService {
    static async subscribe(userId: number, writerId: number) {
        const result  = await WriterSubscriptionRepository.subscribe(userId, writerId);
        if(result) {
            const writer = await getUserToken(writerId);
            if(writer) {
                const title = "Nuevo seguidor";
                const body = `¡tienes un nuevo seguidor!`;
                await NotificationService.sendPushNotification(writer, title, body);
            }
        }
        return result;
    }

    static async unsubscribe(userId: number, writerId: number) {
        return await WriterSubscriptionRepository.unsubscribe(userId, writerId);
    }

    static async getBookSubscriptionsByUser(userId: number) {
        return await WriterSubscriptionRepository.getWriterSubscriptionsByUser(userId);
    }
}

