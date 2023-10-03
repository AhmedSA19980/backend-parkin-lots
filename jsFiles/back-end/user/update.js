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
const express_1 = __importDefault(require("express"));
const app = express_1.default.Router();
const prisma = new client_1.PrismaClient();
function default_1(app) {
    app.post("/update_user", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { name, email, password } = req.body;
        // Find a user by their email address
        const user = yield prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        // Update a user's name
        if (!user) {
            res.json("user not found! create user account");
        }
        const updatedUser = yield prisma.user.update({
            where: {
                email: email,
            },
            data: {
                name: name,
                password: password,
            },
        });
        res.json(updatedUser);
        console.log(user);
    }));
}
exports.default = default_1;
