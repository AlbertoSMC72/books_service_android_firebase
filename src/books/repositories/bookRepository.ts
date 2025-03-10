import pool from "../../config/db_config";
import { RowDataPacket } from "mysql2";

export class BookRepository {
    static async getBookById(id: number) {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute<RowDataPacket[]>(
                `SELECT 
                    b.*, 
                    u.username AS author_name, 
                    COALESCE(
                        (SELECT JSON_ARRAYAGG(g.name) 
                        FROM genres g 
                        JOIN book_genres bg ON g.id = bg.genre_id 
                        WHERE bg.book_id = b.id), '[]') AS genres,
                    COALESCE(
                        (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', c.id, 'title', c.title)) 
                        FROM chapters c 
                        WHERE c.book_id = b.id), '[]') AS chapters
                FROM books b
                JOIN users u ON b.author_id = u.id
                WHERE b.id=?;`,
                [id]
            );

            if (rows.length === 0) return null;

            const book = rows[0];

            // Convertir los strings JSON a arrays/objetos
            book.genres = JSON.parse(book.genres as string);
            book.chapters = JSON.parse(book.chapters as string);

            return book;
        } finally {
            connection.release();
        }
    }

    static async getAllBooks() {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute<RowDataPacket[]>(
                `SELECT 
                    b.*, 
                    COALESCE(
                        (SELECT JSON_ARRAYAGG(g.name) 
                        FROM genres g 
                        JOIN book_genres bg ON g.id = bg.genre_id 
                        WHERE bg.book_id = b.id), '[]') AS genres
                FROM books b;`
            );
            return rows.map(book => ({
                ...book,
                genres: JSON.parse(book.genres as string)
            }));
        } finally {
            connection.release();
        }
    }

    static async createBook(title: string, description: string, authorId: number, genreIds: number[]) {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            const [result]: any = await connection.execute(
                "INSERT INTO books (title, description, author_id) VALUES (?, ?, ?)",
                [title, description, authorId]
            );

            const bookId = result.insertId;

            for (const genreId of genreIds) {
                await connection.execute(
                    "INSERT INTO book_genres (book_id, genre_id) VALUES (?, ?)",
                    [bookId, genreId]
                );
            }

            await connection.commit();
            return bookId;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    static async updateBook(id: number, title: string, description: string, genreIds?: number[]) {
        const connection = await pool.getConnection();
        try {
            await connection.execute(
                "UPDATE books SET title = ?, description = ? WHERE id = ?",
                [title, description, id]
            );

            if (genreIds) {
                await connection.execute("DELETE FROM book_genres WHERE book_id = ?", [id]);
                for (const genreId of genreIds) {
                    await connection.execute(
                        "INSERT INTO book_genres (book_id, genre_id) VALUES (?, ?)",
                        [id, genreId]
                    );
                }
            }
            return true;

        } finally {
            connection.release();
        }
    }

    static async deleteBook(id: number) {
        const connection = await pool.getConnection();
        try {
            await connection.execute("DELETE FROM books WHERE id = ?", [id]);
            return true;
        } finally {
            connection.release();
        }
    }

    static async getBooksByAuthor(authorId: number) {
        const connection = await pool.getConnection();
        try {
            const [userRows] = await connection.execute<RowDataPacket[]>("SELECT * FROM users WHERE id = ?", [authorId]);
            if (userRows.length === 0) return null;

            const [bookRows] = await connection.execute("SELECT * FROM books WHERE author_id = ?", [authorId]);

            return {
                user: userRows[0],
                books: bookRows
            };

        } finally {
            connection.release();
        }
    }

    static async getBooksByGenre(genreId: number) {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute(
                "SELECT b.* FROM books b JOIN book_genres bg ON b.id = bg.book_id WHERE bg.genre_id = ?",
                [genreId]
            );
            return rows;
        } finally {
            connection.release();
        }
    }
}
