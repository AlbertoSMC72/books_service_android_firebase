import pool from '../../config/db_config';

export async function getUsersWhoLikedWriter(authorId: number): Promise<string[]> {
    const connection = await pool.getConnection();
    try {
        const [rows]: any = await connection.execute(
            `
SELECT DISTINCT u.firebase_token
FROM user_subscriptions AS s
JOIN users AS u 
  ON s.user_id = u.id
WHERE s.follower_id = ?
      `,
            [authorId]
        );
        return rows.map((r: any) => r.firebase_token);
    } finally {
        connection.release();
    }
}
