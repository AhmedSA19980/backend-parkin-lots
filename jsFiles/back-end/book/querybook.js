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
function default_1(app) {
    app.get("/reservartiondetail", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { bookId } = req.body;
        const book_card = yield prisma.booking.findUnique({
            where: {
                id: bookId,
            },
            include: {
                user: { select: { id: true,
                        name: true,
                        email: true,
                        isuserdeleted: true
                    } },
            },
        });
        if (book_card === null || book_card === void 0 ? void 0 : book_card.id) {
            return res.status(200).json({ book: book_card });
        }
        return res.status(400).json({ erorr: "reserveration is not found" });
    }));
}
exports.default = default_1;
//* find all user booking 
/*** const book_card = await prisma.user.findUnique({
        where: {
        id: bookId,
        },
        include: {
        booking: { include: { parkinglot: { include: { vehicletype: true } } } },
        },
    }); */ 
