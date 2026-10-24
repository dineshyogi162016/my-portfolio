require("dotenv").config();
const mongoose = require("mongoose");

const DATABASE_URI = process.env.DATABASE_URI || process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME || "MyPortfolio";

let connectionString = "";

if (DATABASE_URI) {
    if (DATABASE_URI.startsWith("mongodb+srv://")) {
        if (DATABASE_URI.includes(".mongodb.net/") && !DATABASE_URI.endsWith(".mongodb.net/")) {
            connectionString = DATABASE_URI;
        } else {
            const cleanBase = DATABASE_URI.replace(/\/$/, "");
            connectionString = `${cleanBase}/${DB_NAME}`;
        }
    } else {
        const cleanBase = DATABASE_URI.replace(/\/$/, "");
        connectionString = `${cleanBase}/${DB_NAME}`;
    }
} else {
    connectionString = `mongodb://127.0.0.1:27017/${DB_NAME}`;
}

if (mongoose.connection.readyState === 0) {
    mongoose.connect(connectionString).then(() => {
        console.log("Connection with Database is Successful");
    }).catch((error) => {
        console.log("DataBase Error : ", error.message || error);
    });
}

module.exports = mongoose;