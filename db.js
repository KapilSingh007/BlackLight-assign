import mysql from 'mysql2/promise';
import dotenv from "dotenv";
dotenv.config();

// MySQL connection
export const mysqlConnection = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DATABASE
});

