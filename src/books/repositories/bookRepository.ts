import pool from "../../config/db_config";

export class BookRepository {
    static async getBookById(id: number) {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute("SELECT * FROM books WHERE id = ?", [id]);
            return rows;
        } finally {
            connection.release();
        }
    }

    static async getAllBooks() {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute("SELECT * FROM books");
            return rows;
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
            const [rows] = await connection.execute("SELECT * FROM books WHERE author_id = ?", [authorId]);
            return rows;
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
