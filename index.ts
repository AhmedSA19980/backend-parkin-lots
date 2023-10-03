import express, { Request, Response } from "express";

import add_park from "./back-end//lots/park";
import delete_park from "./back-end/lots/delete"
import create_user from "./back-end/user/user";
import update_user from "./back-end/user/update";
import {Book_Lot} from "./back-end/book/book";

import query_users from "./back-end/user/users"
import query_user from "./back-end/user/query"
import get_park from "./back-end/lots/query";
import update_park from "./back-end/lots/update"
import query_book from "./back-end/book/query"



import bodyParser from "body-parser";
import session_stripe from "./back-end/payment/stripe"
import { updateParkingLotCapacity } from "./back-end/lib/timebooking";

import  add_customer from "./back-end/payment/addcustomer"
import add_card from "./back-end/payment/addnewcard"
import charge from "./back-end/payment/charges";
import delete_card from "./back-end/payment/deletecard"
import viewallcard from "./back-end/payment/customer's_cards"
import cardupdate from "./back-end/payment/updatecard"
import checkoutstripesession from './back-end/payment/stripe'
import delete_user from "./back-end/user/delete"

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

query_book(app)
session_stripe(app)
create_user(app)
update_user(app)
query_user(app)
delete_user(app)
add_park(app)//calling it with the app object as an argument. This will set up the POST /parkinglots route in your Express app.
Book_Lot(app)
get_park(app)
update_park(app)
delete_park(app)
query_users(app)

add_customer(app)
add_card(app)
charge(app)
delete_card(app)
viewallcard(app)
cardupdate(app)
checkoutstripesession(app)


app.get("/", (req:Request, res:Response) => {
  res.send("Hello, world!");
 
});

setInterval(()=>updateParkingLotCapacity() ,60 * 1000); 
 
app.listen(4000, () => 
  console.log(`
    Server ready at: http://localhost:4000
    See more sample requests: 
  `)
); 