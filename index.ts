import express, { Request, Response } from "express";

import add_park from "./back-end//lots/park";
import delete_park from "./back-end/lots/delete"
import create_user from "./back-end/user/adduser";
import update_user from "./back-end/user/update";
import book_lot from "./back-end/book/book";

import query_users from "./back-end/user/users"
import query_user from "./back-end/user/query"
import get_park from "./back-end/lots/query";
import update_park from "./back-end/lots/update"
import query_book from "./back-end/book/query"
import bodyParser from "body-parser";
import { flashoutExpiredBookingTime } from "./back-end/lib/timebooking";


import delete_user from "./back-end/user/delete"

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

query_book(app)

create_user(app)
update_user(app)
query_user(app)
delete_user(app)
add_park(app)//calling it with the app object as an argument. This will set up the POST /parkinglots route in your Express app.
book_lot(app)
get_park(app)
update_park(app)
delete_park(app)
query_users(app)




app.get("/", (req:Request, res:Response) => {
  res.send("Hello, world!");
 
});

setInterval(() => flashoutExpiredBookingTime(), 60 * 1000); 
 
app.listen(4000, () => 
  console.log(`
    Server ready at: http://localhost:4000
    See more sample requests: 
  `)
); 