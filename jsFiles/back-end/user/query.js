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
    app.get("/user:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
        function main() {
            return __awaiter(this, void 0, void 0, function* () {
                const { id } = req.body;
                try {
                    const users = yield prisma.user.findMany({
                        where: { id: id },
                    });
                    console.log(users);
                    res.json(users);
                }
                catch (err) {
                    console.log(err);
                }
                finally {
                    () => __awaiter(this, void 0, void 0, function* () {
                        yield prisma.$disconnect();
                    });
                }
            });
        }
        return main();
    }));
}
exports.default = default_1;
