import pool from "../../config/db_config";
import { RowDataPacket } from "mysql2";

export class BookSubscriptionRepository {

    static async subscribe(userId: number, bookId: number) {
        const connection = await pool.getConnection();
        try {
            await connection.execute(
                "INSERT INTO likes (user_id, book_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE book_id = book_id", 
                [userId, bookId]
            );
            return { message: "Subscripcion añadida correctamente" };
        } finally {
            connection.release();
        }
    }

    static async unsubscribe(userId: number, bookId: number) {
        const connection = await pool.getConnection();
        try {
            await connection.execute("DELETE FROM likes WHERE user_id = ? AND book_id = ?", [userId, bookId]);
            return { message: "Subscripcion eliminada correctamente" };
        } finally {
            connection.release();
        }
    }

    static async getBookSubscriptionsByUser(userId: number) {
        const connection = await pool.getConnection();
        try {
            const [userRows] = await connection.execute<RowDataPacket[]>(
                "SELECT id, username, created_at FROM users WHERE id = ?", 
                [userId]
            );

            console.log(userRows);

            if (userRows.length === 0) {
                return { message: "Usuario no encontrado" };
            }

            const [bookRows] = await connection.execute<RowDataPacket[]>(
                "SELECT b.id, b.title, b.description, b.created_at FROM books b JOIN likes l ON b.id = l.book_id WHERE l.user_id = ?", 
                [userId]
            );

            return {
                id: userRows[0].id,
                username: userRows[0].username,
                subscriptions: bookRows
            };
        } finally {
            connection.release();
        }
    }
}
