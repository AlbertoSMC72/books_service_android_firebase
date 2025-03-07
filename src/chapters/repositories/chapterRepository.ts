import pool from "../../config/db_config";
import { RowDataPacket } from "mysql2";


export class ChapterRepository {
    static async getChapterById(id: number) {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute<RowDataPacket[]>(
                "SELECT * FROM chapters WHERE id = ?",
                [id]
            );
            return rows.length > 0 ? rows[0] : null;
        } finally {
            connection.release();
        }
    }

    static async getAllChapters() {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute("SELECT * FROM chapters");
            return rows;
        } finally {
            connection.release();
        }
    }

    static async createChapter(title: string, content: string, bookId: number) {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            const [result]: any = await connection.execute(
                "INSERT INTO books.chapters (title, content, book_id, created_at) VALUES (?, ?, ?, NOW())",
                [title, content, bookId]
            );
            await connection.commit();
            return result;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }
    
    static async updateChapter(id: number, title: string, content: string) {
        const connection = await pool.getConnection();
        try {
            await connection.execute(
                "UPDATE chapters SET title = ?, content = ? WHERE id = ?",
                [title, content, id]
            );
            return true;
        } finally {
            connection.release();
        }
    }    

    static async deleteChapter(id: number) {
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.execute(
                "DELETE FROM chapters WHERE id = ?",
                [id]
            );
            return result;
        } finally {
            connection.release();
        }
    }

    static async getChaptersByBookId(bookId: number) {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute(
                "SELECT * FROM chapters WHERE book_id = ?",
                [bookId]
            );
            return rows;
        } finally {
            connection.release();
        }
    }
}
