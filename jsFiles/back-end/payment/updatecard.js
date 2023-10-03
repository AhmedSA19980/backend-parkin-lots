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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const stripe_1 = __importDefault(require("stripe"));
const key = process.env.STRIPE_KEY;
const stripe = new stripe_1.default(key, {
    apiVersion: "2022-11-15",
});
const app = (0, express_1.default)();
function default_1(app) {
    app.post("/updateCardDetails", (req, res) => __awaiter(this, void 0, void 0, function* () {
        let { cardId, cardExpMonth, cardExpYear, cardName } = req.body;
        if (!cardId) {
            return res.status(400).send({
                Error: "cardId is Required to update"
            });
        }
        try {
            const card = yield stripe.customers.updateSource("cus_OOW9KHrSglsa0u", //* customer id
            cardId, {
                name: cardName,
                exp_month: cardExpMonth,
                exp_year: cardExpYear,
            });
            return res.status(200).send({
                updatedCard: card,
            });
        }
        catch (error) {
            return res.status(400).send({ Error: error.raw.message });
        }
    }));
}
exports.default = default_1;
