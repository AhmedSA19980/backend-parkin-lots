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
    // Delete a saved card of the customer
    app.post("/delete_card", (req, res) => __awaiter(this, void 0, void 0, function* () {
        console.log("\n\n Body Passed:", req.body);
        const { cardId, customer_Id } = req.body;
        if (!cardId) {
            return res.status(400).send({
                Error: "CardId is required to delete Card",
            });
        }
        try {
            const deleteCard = yield stripe.customers.deleteSource("cus_OOTlXk5kQE77LN", cardId);
            return res.status(200).send(deleteCard);
        }
        catch (error) {
            return res.status(400).send({
                Error: error.raw.message,
            });
        }
    }));
}
exports.default = default_1;
