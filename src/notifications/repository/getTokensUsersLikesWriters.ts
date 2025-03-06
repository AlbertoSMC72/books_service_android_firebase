import pool from '../../config/db_config';

export async function getUsersWhoLikedWriter(authorId: number): Promise<string[]> {
    const connection = await pool.getConnection();
    try {
        const [rows]: any = await connection.execute(
            `
      SELECT 
        u.firebase_token
      FROM user_subscriptions s
      JOIN users u ON s.follower_id = u.id
      WHERE s.user_id = ?
      `,
            [authorId]
        );
        return rows.map((r: any) => r.firebase_token);
    } finally {
        connection.release();
    }
}
