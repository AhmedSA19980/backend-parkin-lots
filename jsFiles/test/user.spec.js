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
const chai_1 = __importDefault(require("chai"));
const sinon_1 = __importDefault(require("sinon"));
const user_1 = __importDefault(require("../back-end/user/user"));
const expect = chai_1.default.expect;
describe("myFunction", () => {
    let app;
    let prisma;
    let req;
    let res;
    beforeEach(() => {
        app = { post: sinon_1.default.stub() };
        prisma = {
            user: {
                create: sinon_1.default.stub(),
                findMany: sinon_1.default.stub(),
            },
        };
        req = { body: {} };
        res = { json: sinon_1.default.spy() };
        (0, user_1.default)(app);
    });
    it("should create a new user and return it in the response", () => __awaiter(void 0, void 0, void 0, function* () {
        const userData = {
            name: "Alice",
            email: "alice@example.com",
            password: "password123",
        };
        req.body = userData;
        prisma.user.create.resolves(userData);
        prisma.user.findMany.resolves([userData]);
        const postCallback = app.post.args[0][1];
        yield postCallback(req, res);
        expect(prisma.user.create.calledWith({ data: userData })).to.be.true;
        expect(res.json.calledWith(userData)).to.be.true;
    }));
});
