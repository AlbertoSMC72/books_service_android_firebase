import pool from "../../config/db_config";

export class UserLikesBooksRepository {
    static async addLike(userId: number, bookId: number) {
        const connection = await pool.getConnection();
        try {
            await connection.execute("CALL add_like(?, ?)", [userId, bookId]);
            return { message: "Like añadido correctamente" };
        } finally {
            connection.release();
        }
    }

    static async removeLike(userId: number, bookId: number) {
        const connection = await pool.getConnection();
        try {
            await connection.execute("CALL remove_like(?, ?)", [userId, bookId]);
            return { message: "Like eliminado correctamente" };
        } finally {
            connection.release();
        }
    }

    static async getLikesByBook(bookId: number) {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute("CALL get_likes_by_book(?)", [bookId]);
            return rows;
        } finally {
            connection.release();
        }
    }
}
