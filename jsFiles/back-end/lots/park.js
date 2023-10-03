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
const client_1 = require("@prisma/client");
const app = express_1.default.Router();
const prisma = new client_1.PrismaClient();
const calculatePrice = (cost, m) => {
    // 5 dollar$ 
    const hour_rate = m / 60;
    return cost * hour_rate; // price
};
function default_1(app) {
    app.post("/parkinglots", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { location, capacity, hourlyRate, capacityUsed } = req.body;
        const parkinglot = yield prisma.parkinglot.create({
            data: {
                location: location,
                capacity: capacity,
                capacityUsed: capacityUsed,
                hourlyRate: hourlyRate,
            },
            include: {
                vehicletype: true,
            },
        });
        res.json(parkinglot);
    }));
}
exports.default = default_1;
