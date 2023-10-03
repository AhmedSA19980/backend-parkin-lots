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
const app = (0, express_1.default)();
// Get List of all saved card of the customers
const stripe = new stripe_1.default(process.env.STRIPE_KEY, {
    apiVersion: "2022-11-15",
});
function default_1(app) {
    app.get("/viewallcards", (req, res) => __awaiter(this, void 0, void 0, function* () {
        let cards = [];
        const { customer_Id } = req.body;
        try {
            const savedCards = yield stripe.customers.listSources("cus_OOTlXk5kQE77LN", {
                object: "card",
            });
            const cardDetails = Object.values(savedCards.data);
            cardDetails.forEach((cardData) => {
                let obj = {
                    cardId: cardData.id,
                    //cardType: cardData.brand,
                    //cardExpDetails: `${cardData.exp_month}/${cardData.exp_year}`,
                    //cardLast4: cardData.last4,
                };
                cards.push(obj);
            });
            return res.status(200).send({
                cardDetails: cards,
            });
        }
        catch (error) {
            return res.status(400).send({
                Error: error.raw.message,
            });
        }
    }));
}
exports.default = default_1;
