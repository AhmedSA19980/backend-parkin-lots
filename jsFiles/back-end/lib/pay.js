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
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_KEY, {
    apiVersion: "2022-11-15",
});
function default_1(amount, paymentmethodId, customer) {
    return __awaiter(this, void 0, void 0, function* () {
        const paymentIntent = yield stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            customer: customer,
            payment_method: paymentmethodId,
            confirm: true
        });
        if (paymentIntent.status === "succeeded") {
            return { success: true, message: "payment was successful" };
        }
        else if (!paymentIntent.customer || !paymentIntent.payment_method) {
            return { success: false, message: "you must provide customer id or payment id" };
        }
        else {
            return { success: false, error: "Payment failed, please try again" };
        }
    });
}
exports.default = default_1;
