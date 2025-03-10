import pool from '../../config/db_config';

export async function getUserToken(userId: number): Promise<string | null> {
    const connection = await pool.getConnection();
    try {
        const [rows]: any = await connection.execute(
            'SELECT firebase_token FROM books.users WHERE id = ?',
            [userId]
        );
        if (rows.length > 0 && rows[0].firebase_token) {
            return rows[0].firebase_token;
        } else {
            return null;
        }
    } finally {
        connection.release();
    }
}


export async function getWriterTokenByBook(bookId: number): Promise<string | null> {
    const connection = await pool.getConnection();
    try {
      const [rows]: any = await connection.execute(
        `
        SELECT 
          u.firebase_token
        FROM books b
        JOIN users u 
          ON b.user_id = u.id
        WHERE b.id = ?
        `,
        [bookId]
      );
      if (rows.length > 0 && rows[0].firebase_token) {
        return rows[0].firebase_token;
      } else {
        return null;
      }
    } finally {
      connection.release();
    }
  }
  