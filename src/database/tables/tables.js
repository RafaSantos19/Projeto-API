import openDb from "../configDB.js";

export function CreateTable(){
    openDb().then(db => {
        //Create da tabela de agendamentos(schedule)
        db.exec(
            `
            CREATE TABLE IF NOT EXISTS SERVICES
            (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            description TEXT,
            price REAL NOT NULL,
            duration INTEGER NOT NULL
            );
            `
        );

        db.exec(
            `
            CREATE TABLE IF NOT EXISTS USER 
            (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL, 
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                staff INTEGER DEFAULT (0)
            );
            `
        )

        db.exec(
            `
            CREATE TABLE IF NOT EXISTS SCHEDULE
            (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                data TEXT NOT NULL,
                userId INTEGER NOT NULL,
                serviceId INTEGER NOT NULL,
                FOREIGN KEY(userId) REFERENCES USER(id),
                FOREIGN KEY(serviceId) REFERENCES SERVICE(id)
            );
            `
        )
    });
};
