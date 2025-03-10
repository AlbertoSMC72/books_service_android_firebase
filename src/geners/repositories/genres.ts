import pool from "../../config/db_config";

export class GenreRepository {
    static async createGenre(name: string) {
        const connection = await pool.getConnection();
        try {
            const [rows]: any = await connection.execute("CALL create_genre(?)", [name]);
            return rows[0] || null;
        } finally {
            connection.release();
        }
    }

    static async getAllGenres() {
        const connection = await pool.getConnection();
        try {
            console.log("obteniendo todos los géneros");
            const [rows] : any = await connection.execute("CALL get_all_genres()");
            return rows[0] || null;
        } finally {
            connection.release();
        }
    }

    static async addUserFavoriteGenre(userId: number, genreId: number) {
        const connection = await pool.getConnection();
        try {
            await connection.execute("INSERT INTO user_fav_genres (user_id, genre_id) VALUES (?, ?)", [userId, genreId]);
            return { message: "Género añadido a favoritos" };
        } finally {
            connection.release();
        }
    }

    static async addBookGenre(bookId: number, genreId: number) {
        const connection = await pool.getConnection();
        try {
            await connection.execute("INSERT INTO book_genres (book_id, genre_id) VALUES (?, ?)", [bookId, genreId]);
            return { message: "Género asociado al libro correctamente" };
        } finally {
            connection.release();
        }
    }
}
