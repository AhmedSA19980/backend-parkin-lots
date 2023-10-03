import { PrismaClient, booking } from "@prisma/client";
const prisma = new PrismaClient();

import { format, utcToZonedTime,zonedTimeToUtc } from "date-fns-tz";





export  function localTime(dbDate:Date) { 



 //const dbDate = new Date("2023-06-19T11:32:00Z");
const currentDate:Date = new Date(dbDate);
const timeZone: string = "Asia/Riyadh";
const options: Intl.DateTimeFormatOptions = { timeZone, dateStyle: "full", timeStyle: "long" };
const dbDateString:string = dbDate.toLocaleString("en-US", options);
const currentDateString:string = currentDate.toLocaleString("en-US", options );
let status_of_time:string  = ""



if (dbDateString < currentDateString) {
   status_of_time = "The database date is earlier than the current date.";
} else if (dbDateString > currentDateString) {
   status_of_time = "The database date is later than the current date.";
} else {
   status_of_time = "The database date is equal to the current date."
}
 console.log(status_of_time)
 console.log(currentDateString)
 return status_of_time


}
