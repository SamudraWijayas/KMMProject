import mysql from 'mysql2/promise';
import 'dotenv/config';

const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});
const testConnection = async () => {
    try {
        await db.getConnection();
        console.log("Berhasil terhubung ke database");
    } catch (e) {
        console.log("Gagal terhubung ke database");
    }
}

const query = async (query, value) => {
    try {
        const [result] = await db.query(query, value ?? []);
        return result;
    } catch (e) {
        console.log("Gagal menjalankan query", e);
        throw e; // Melempar error agar bisa ditangani di tempat lain
    }
}

export { testConnection, query };
