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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function default_1(app) {
    app.get("/users", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const query_all_users = yield prisma.user.findMany({
            select: {
                // password:false,
                name: true,
                email: true,
                isuserdeleted: true,
            }
        });
        return res.status(200).json({ users: query_all_users });
    }));
}
exports.default = default_1;
function excludePasswordMiddleware(params, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield next(params);
        if ((params === null || params === void 0 ? void 0 : params.model) === "User" && ((_b = (_a = params === null || params === void 0 ? void 0 : params.args) === null || _a === void 0 ? void 0 : _a.select) === null || _b === void 0 ? void 0 : _b.password) !== true) {
            delete result.password;
        }
        return result;
    });
}
prisma.$use(excludePasswordMiddleware);
