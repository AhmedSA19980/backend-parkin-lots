"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localTime = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function localTime(dbDate) {
    //const dbDate = new Date("2023-06-19T11:32:00Z");
    const currentDate = new Date(dbDate);
    const timeZone = "Asia/Riyadh";
    const options = { timeZone, dateStyle: "full", timeStyle: "long" };
    const dbDateString = dbDate.toLocaleString("en-US", options);
    const currentDateString = currentDate.toLocaleString("en-US", options);
    let status_of_time = "";
    if (dbDateString < currentDateString) {
        status_of_time = "The database date is earlier than the current date.";
    }
    else if (dbDateString > currentDateString) {
        status_of_time = "The database date is later than the current date.";
    }
    else {
        status_of_time = "The database date is equal to the current date.";
    }
    console.log(status_of_time);
    console.log(currentDateString);
    return status_of_time;
}
exports.localTime = localTime;
