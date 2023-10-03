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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get("/booked", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.body;
    const book_card = yield prisma.user.findUnique({
        where: {
            id: bookId
        },
        include: {
            booking: { include: { parkinglot: { include: { vehicletype: true } } } },
        }
    });
    if (!book_card) {
        return res.status(400).json({ erorr: "reserveration is not found" });
    }
    return res.status(200).json({ book: book_card });
}));
app.delete("/booking:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const book = yield prisma.booking.delete({
        where: { id: parseInt(bookId) },
    });
    if (!book) {
        res.status(500).json({ error: "failed to create book " });
    }
    res.json({ msg: "ticket card is canceled successfully" });
}));
