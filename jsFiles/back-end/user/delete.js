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
    app.delete("/users/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const userId = parseInt(req.params.id);
        // Delete the user with the specified ID
        const deletedUser = yield prisma.user.update({
            where: {
                id: userId,
            },
            data: { isuserdeleted: true }, // this field doesn't show up
        });
        res.json(deletedUser);
    }));
}
exports.default = default_1;
