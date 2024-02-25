import express from 'express';
import moment from 'moment';
import { insertDummyData, createtab } from "./dummydata.js";
import { mysqlConnection } from "./db.js";
import dotenv from "dotenv";

const app = express();

dotenv.config();


app.get('/createtab', createtab);
app.get('/dummydata', insertDummyData);


app.get('/leaderboard/current', async (req, res) => {
    const startOfWeek = moment().startOf('week').format('YYYY-MM-DD HH:mm:ss');
    const endOfWeek = moment().endOf('week').format('YYYY-MM-DD HH:mm:ss');
    const query = `SELECT * FROM GAME WHERE TimeStamp BETWEEN '${startOfWeek}' AND '${endOfWeek}' ORDER BY Score DESC LIMIT 200`;
    console.log("Connecting to run SQL query");
    const [rows] = await mysqlConnection.execute(query);
    console.log("SQL query ran successfully for /leaderboard/current ");

    res.send(rows);
});


app.get('/leaderboard/last/:country', async (req, res) => {
    const startOfLastWeek = moment().subtract(1, 'weeks').startOf('week').format('YYYY-MM-DD HH:mm:ss');
    const endOfLastWeek = moment().subtract(1, 'weeks').endOf('week').format('YYYY-MM-DD HH:mm:ss');
    const query = `SELECT * FROM GAME WHERE Country = '${req.params.country}' AND TimeStamp BETWEEN '${startOfLastWeek}' AND '${endOfLastWeek}' ORDER BY Score DESC LIMIT 200`;
    console.log("Connecting to run SQL query for /leaderboard/last");
    const [rows] = await mysqlConnection.execute(query);
    console.log("SQL query ran successfully");

    res.send(rows);
});


app.get('/rank/:userId', async (req, res) => {
    const query = `SELECT COUNT(*) + 1 AS user_rank FROM GAME WHERE Score > (SELECT Score FROM GAME WHERE UID = '${req.params.userId}')`;
    console.log("Connecting to run SQL query for /rank");
    const [rows] = await mysqlConnection.execute(query);
    console.log("SQL query ran successfully");
    res.send(rows);

});
app.get("/", (req, res) => {
    res.send("<h1>Welcome to Blacklight assignment deployement </h1>");
});

// app.listen(8080, () => {
//     console.log('Server is running at http://localhost:8080');
// });
