import { WriterSubscriptionRepository } from "../repositories/writerSubsRepository";

export class WriterSubscriptionService {
    static async subscribe(userId: number, writerId: number) {
        return await WriterSubscriptionRepository.subscribe(userId, writerId);
    }

    static async unsubscribe(userId: number, writerId: number) {
        return await WriterSubscriptionRepository.unsubscribe(userId, writerId);
    }

    static async getBookSubscriptionsByUser(userId: number) {
        return await WriterSubscriptionRepository.getWriterSubscriptionsByUser(userId);
    }
}
