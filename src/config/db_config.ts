import mysql from "mysql2/promise";
import dotenv from "dotenv";

const db = mysql.createPool({
    host: dotenv.config().parsed?.DB_HOST,
    user: dotenv.config().parsed?.DB_USER,
    password: dotenv.config().parsed?.DB_PASSWORD,
    database: dotenv.config().parsed?.DB_DATABASE,
    port: 3306,
    waitForConnections: true,
});

export const getConnection = async () => {
    console.log("Conexión a la base de datos exitosa");
    return await db.getConnection();
};


export default db;
