import { UserRepository } from "../repositories/users";

export class UserService {
    static async createUser(username: string, email: string, password: string, firebaseToken: string | null) {
        const hashedPassword = password; // Aquí podrías usar bcrypt para encriptar
        return await UserRepository.createUser(username, email, hashedPassword, firebaseToken);
    }

    static async getUserById(id: number) {
        return await UserRepository.getUserById(id);
    }

    static async updateUser(id: number, username: string, email: string, firebaseToken: string | null) {
        return await UserRepository.updateUser(id, username, email, firebaseToken);
    }

    static async deleteUser(id: number) {
        return await UserRepository.deleteUser(id);
    }
}
