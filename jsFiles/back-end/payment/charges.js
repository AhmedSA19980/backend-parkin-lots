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
dotenv_1.default.config();
const app = (0, express_1.default)();
const stripe = new stripe_1.default(process.env.STRIPE_KEY, {
    apiVersion: "2022-11-15",
});
function default_1(app) {
    app.post("/charge", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { amount, cardId, oneTime, email, customer_Id } = req.body;
        if (oneTime) {
            const { cardNumber, cardExpMonth, cardExpYear, cardCVC, country, postalCode, } = req.body;
            // only one time pay
            if (!cardNumber || !cardExpMonth || !cardExpYear || !cardCVC) {
                return res.status(400).send({
                    Error: "Necessary Card Details are required for One Time Payment",
                });
            }
            try {
                const cardToken = yield stripe.tokens.create({
                    card: {
                        number: cardNumber,
                        exp_month: cardExpMonth,
                        exp_year: cardExpYear,
                        cvc: cardCVC,
                        address_state: country,
                        address_zip: postalCode,
                    },
                });
                const charge = yield stripe.charges.create({
                    amount: amount,
                    currency: "usd",
                    source: cardToken.id,
                    receipt_email: email,
                    description: `Stripe Charge Of Amount ${amount} for One Time Payment`,
                });
                if (charge.status === "succeeded") {
                    return res.status(200).send({ Success: charge });
                }
                else {
                    return res
                        .status(400)
                        .send({ Error: "Please try again later for One Time Payment" });
                }
            }
            catch (error) {
                return res.status(400).send({
                    Error: error.raw.message,
                });
            }
        }
        else { //pay with existing card
            try {
                const createCharge = yield stripe.charges.create({
                    amount: amount,
                    currency: "usd",
                    receipt_email: email,
                    customer: customer_Id,
                    //card:cardId
                    description: `Stripe Charge Of Amount ${amount} for Payment`,
                });
                console.log("\n\n Start 2");
                if (createCharge.status === "succeeded") {
                    return res.status(200).send({ Success: createCharge });
                }
                else {
                    return res
                        .status(400)
                        .send({ Error: "Please try again later for payment" });
                }
            }
            catch (error) {
                return res.status(400).send({
                    Error: error,
                });
            }
        }
    }));
}
exports.default = default_1;
