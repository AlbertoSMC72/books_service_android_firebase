import pool from "../../config/db_config";
import { RowDataPacket } from "mysql2";


export class WriterSubscriptionRepository {
    static async subscribe(userId: number, writerId: number) {
        const connection = await pool.getConnection();
        try {
            const a=await connection.execute(
                "INSERT INTO user_subscriptions (user_id, follower_id) VALUES (?, ?)", 
                [userId, writerId]
            );
            return { message: "Suscripción añadida correctamente" };
        } finally {
            connection.release();
        }
    }

    static async unsubscribe(userId: number, writerId: number) {
        const connection = await pool.getConnection();
        try {
            await connection.execute("DELETE FROM user_subscriptions WHERE user_id = ? AND follower_id = ?", [userId, writerId]);
            return { message: "Suscripción eliminada correctamente" };
        } finally {
            connection.release();
        }
    }

    static async getWriterSubscriptionsByUser(userId: number) {
        const connection = await pool.getConnection();
        try {
            const [userRows] = await connection.execute<RowDataPacket[]>(
                "SELECT id, username FROM users WHERE id = ?", 
                [userId]
            );

            if (userRows.length === 0) {
                return { message: "Usuario no encontrado" };
            }

            const [subscriptionRows] = await connection.execute<RowDataPacket[]>(
                "SELECT u.id, u.username FROM users u JOIN user_subscriptions us ON u.id = us.follower_id WHERE us.user_id = ?", 
                [userId]
            );

            return {
                id: userRows[0].id,
                username: userRows[0].username,
                subscriptions: subscriptionRows
            };
        } finally {
            connection.release();
        }
    }

    static async isSubscribed(userId: number, writerId: number) {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute<RowDataPacket[]>(
                "SELECT 1 FROM user_subscriptions WHERE user_id = ? AND follower_id = ? LIMIT 1", 
                [userId, writerId]
            );
            
            return { 
                isSubscribed: rows.length > 0 
            };
        } finally {
            connection.release();
        }
    }
}

