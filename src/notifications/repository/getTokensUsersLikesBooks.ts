import pool from '../../config/db_config';

export async function getUsersWhoLikedBook(bookId: number): Promise<string[]> {
  const connection = await pool.getConnection();
  try {
    const [rows]: any = await connection.execute(
      `
      SELECT 
        u.firebase_token
      FROM likes l
      JOIN users u ON l.user_id = u.id
      WHERE l.book_id = ?
      `,
      [bookId]
    );

    return rows.map((r: any) => r.firebase_token);
  } finally {
    connection.release();
  }
}
