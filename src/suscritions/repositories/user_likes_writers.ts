import pool from "../../config/db_config";

export class UserLikesWritersRepository {
    static async subscribeUser(userId: number, writerId: number) {
        const connection = await pool.getConnection();
        try {
            await connection.execute("CALL add_subscription(?, ?)", [userId, writerId]);
            return { message: "Suscripción añadida correctamente" };
        } finally {
            connection.release();
        }
    }

    static async unsubscribeUser(userId: number, writerId: number) {
        const connection = await pool.getConnection();
        try {
            await connection.execute("CALL remove_subscription(?, ?)", [userId, writerId]);
            return { message: "Suscripción eliminada correctamente" };
        } finally {
            connection.release();
        }
    }

    static async getUserSubscriptions(userId: number) {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute("CALL get_user_subscriptions(?)", [userId]);
            return rows;
        } finally {
            connection.release();
        }
    }
}
