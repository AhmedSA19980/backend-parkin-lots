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
// we need to specify if auth ,so only manager can update 
function default_1(app) {
    app.post("/update_parkinglots", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { location, capacity, hourlyRate } = req.body;
        const parkinglot = yield prisma.parkinglot.update({
            where: {
                id: req.body // mamanger must update 
            },
            data: {
                location: location,
                capacity: capacity,
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
