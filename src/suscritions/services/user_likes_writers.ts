import { UserLikesWritersRepository } from "../repositories/user_likes_writers";

export class UserLikesWritersService {
    static async subscribeUser(userId: number, writerId: number) {
        return await UserLikesWritersRepository.subscribeUser(userId, writerId);
    }

    static async unsubscribeUser(userId: number, writerId: number) {
        return await UserLikesWritersRepository.unsubscribeUser(userId, writerId);
    }

    static async getUserSubscriptions(userId: number) {
        return await UserLikesWritersRepository.getUserSubscriptions(userId);
    }
}
