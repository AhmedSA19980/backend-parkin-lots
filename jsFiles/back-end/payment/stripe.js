"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stripe_1 = __importDefault(require("stripe"));
const dotenv_1 = __importDefault(require("dotenv"));
const calcuate_1 = require("../calc/calcuate");
dotenv_1.default.config();
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const stripe = new stripe_1.default(process.env.STRIPE_KEY, {
    apiVersion: "2022-11-15",
});
const app = (0, express_1.default)();
const YOUR_DOMAIN = process.env.URL_DOMAIN;
function default_1(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.post("/create-checkout-session", (req, res) => __awaiter(this, void 0, void 0, function* () {
            let capacity = 0;
            const { startTime, endTime, userId, parkingLotId } = req.body;
            const parkinglot_id = yield prisma.parkinglot.findUniqueOrThrow({
                where: { id: parkingLotId },
            });
            const calc = new calcuate_1.book();
            const find_time = calc.getTimeCheck(startTime, endTime);
            const find_price = calc.calculatePrice(parkinglot_id.hourlyRate, find_time);
            const total_cost = find_price * (1 + 0.15);
            const session = yield stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: [
                    {
                        price_data: {
                            currency: "usd",
                            product_data: { name: "parkinglot_price" },
                            unit_amount: total_cost * 100,
                            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                        },
                        quantity: capacity,
                    },
                ],
                mode: "payment",
                success_url: `${process.env.URL_DOMAIN}/success.html`,
                cancel_url: `${process.env.URL_DOMAIN}/cancel.html`,
            });
            return res.json({ sessionid: session.id });
        }));
    });
}
exports.default = default_1;
