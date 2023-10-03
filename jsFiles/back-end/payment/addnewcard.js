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
// Add a new card of the customer
const stripe = new stripe_1.default(process.env.STRIPE_KEY, {
    apiVersion: "2022-11-15",
});
const app = (0, express_1.default)();
function default_1(app) {
    app.post("/add_card", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { customer_Id, cardNumber, cardExpMonth, cardExpYear, cardCVC, cardName, country, postal_code, } = req.body;
        if (!cardNumber || !cardExpMonth || !cardExpYear || !cardCVC) {
            return res.status(400).send({
                Error: `Please Provide All Necessary Details to save the card ${cardExpMonth} & ${cardExpYear}`,
            });
        }
        try {
            const cardToken = yield stripe.tokens.create({
                card: {
                    name: cardName,
                    number: cardNumber,
                    exp_month: cardExpMonth,
                    exp_year: cardExpYear,
                    cvc: cardCVC,
                    address_country: country,
                    address_zip: postal_code,
                },
                //customer: customer.stripe_id,
                // stripe_account: StripeAccountId,
            });
            //* we me must set customer id in the first argument instead of str mutiple customer == var
            const card = yield stripe.customers.createSource("cus_OOTlXk5kQE77LN", {
                source: `${cardToken.id}`,
            });
            console.log("CARD TOKEN", cardToken, "card", card);
            return res.status(200).send({
                card: card.id,
            });
        }
        catch (error) {
            return res.status(400).send({
                Error: error.raw.message || "cutomer not exit",
            });
        }
    }));
}
exports.default = default_1;
