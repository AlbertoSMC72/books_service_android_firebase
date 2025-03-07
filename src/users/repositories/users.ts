import pool from "../../config/db_config";

export class UserRepository {
    static async createUser(username: string, email: string, passwordHash: string, firebaseToken: string | null) {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute("CALL create_user(?, ?, ?, ?)", [
                username,
                email,
                passwordHash,
                firebaseToken,
            ]);
            return rows;
        } finally {
            connection.release();
        }
    }

    static async getUserById(id: number) {
        const connection = await pool.getConnection();
        try {
            const [rows]: any = await connection.execute("CALL get_user_by_id(?)", [id]);
            return rows.length > 0 ? rows[0] : null;
        } finally {
            connection.release();
        }
    }
    

    static async updateUser(id: number, username: string, email: string, firebaseToken: string | null) {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute("CALL update_user(?, ?, ?, ?)", [
                id,
                username,
                email,
                firebaseToken,
            ]);
            return rows;
        } finally {
            connection.release();
        }
    }

    static async deleteUser(id: number) {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute("CALL delete_user(?)", [id]);
            return rows;
        } finally {
            connection.release();
        }
    }

    static async login(email: string, password: string) {
        const connection = await pool.getConnection();
        try {
            const [rows]: any = await connection.execute("SELECT username FROM users where email = ? and password_hash = ?", [email, password]);
            return rows.length > 0 ? rows[0] : null;
        } finally {
            connection.release();
        }
    }
}
