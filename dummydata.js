import faker from "faker";
import { mysqlConnection } from "./db.js";

export async function createtab() {
    const query = `CREATE TABLE IF NOT EXISTS GAME (
      UID VARCHAR(255) NOT NULL,
      Name VARCHAR(255) NOT NULL,
      Score INT,
      Country CHAR(2),
      TimeStamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
    await mysqlConnection.execute(query);
}



export async function insertDummyData() {
    for (let i = 0; i < 10000; i++) {
        const uid = faker.random.uuid();
        const name = faker.name.findName().replace(/'/g, "''");
        const score = faker.random.number({ min: 0, max: 100 });
        const country = faker.address.countryCode();
        const query = `INSERT INTO GAME (UID, Name, Score, Country,TimeStamp) VALUES ('${uid}', '${name}', ${score}, '${country}', FROM_UNIXTIME(
            UNIX_TIMESTAMP('2024-01-30 14:53:27') + FLOOR(0 + (RAND() * 63072000))
        ))`;
        await mysqlConnection.execute(query);
    }
    console.log('Dummy data inserted');
}


