"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./back-end/user/user"));
const park_1 = __importDefault(require("./back-end//lots/park"));
const update_1 = __importDefault(require("./back-end/user/update"));
const book_1 = require("./back-end/book/book");
const users_1 = __importDefault(require("./back-end/user/users"));
const query_1 = __importDefault(require("./back-end/user/query"));
const query_2 = __importDefault(require("./back-end/lots/query"));
const update_2 = __importDefault(require("./back-end/lots/update"));
const querybook_1 = __importDefault(require("./back-end/book/querybook"));
const body_parser_1 = __importDefault(require("body-parser"));
const stripe_1 = __importDefault(require("./back-end/payment/stripe"));
const timebooking_1 = require("./back-end/lib/timebooking");
const addcustomer_1 = __importDefault(require("./back-end/payment/addcustomer"));
const addnewcard_1 = __importDefault(require("./back-end/payment/addnewcard"));
const charges_1 = __importDefault(require("./back-end/payment/charges"));
const deletecard_1 = __importDefault(require("./back-end/payment/deletecard"));
const customer_s_cards_1 = __importDefault(require("./back-end/payment/customer's_cards"));
const updatecard_1 = __importDefault(require("./back-end/payment/updatecard"));
const stripe_2 = __importDefault(require("./back-end/payment/stripe"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
(0, querybook_1.default)(app);
(0, stripe_1.default)(app);
(0, user_1.default)(app);
(0, update_1.default)(app);
(0, query_1.default)(app);
(0, park_1.default)(app); //calling it with the app object as an argument. This will set up the POST /parkinglots route in your Express app.
(0, book_1.Book_Lot)(app);
(0, query_2.default)(app);
(0, update_2.default)(app);
(0, users_1.default)(app);
(0, addcustomer_1.default)(app);
(0, addnewcard_1.default)(app);
(0, charges_1.default)(app);
(0, deletecard_1.default)(app);
(0, customer_s_cards_1.default)(app);
(0, updatecard_1.default)(app);
(0, stripe_2.default)(app);
app.get("/", (req, res) => {
    res.send("Hello, world!");
});
setInterval(() => (0, timebooking_1.updateParkingLotCapacity)(), 60 * 1000);
app.listen(4000, () => console.log(`
    Server ready at: http://localhost:4000
    See more sample requests: 
  `));
