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
exports.Book_Lot = void 0;
const client_1 = require("@prisma/client");
const calcuate_1 = require("../calc/calcuate");
const prisma = new client_1.PrismaClient();
const express_1 = __importDefault(require("express"));
const validTime_1 = require("../lib/validTime");
const stripe_1 = __importDefault(require("stripe"));
const pay_1 = __importDefault(require("../lib/pay"));
const stripe = new stripe_1.default(process.env.STRIPE_KEY, {
    apiVersion: "2022-11-15",
});
const app = (0, express_1.default)();
function Book_Lot(app) {
    app.post("/booking", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { startTime, endTime, userId, parkingLotId, capac, } = req.body;
        const { paymentmethodId, customer } = req.body;
        const parkinglot_id = yield prisma.parkinglot.findUnique({
            where: { id: parkingLotId },
        });
        const user_id = yield prisma.user.findFirstOrThrow({
            where: { id: userId },
        });
        let updateParkingLotCapacityUsed;
        const calc = new calcuate_1.book();
        const find_time = calc.getTimeCheck(startTime, endTime);
        const find_price = calc.calculatePrice(parkinglot_id.hourlyRate, find_time);
        const total_cost = find_price * (1 + 0.15);
        if (!(0, validTime_1.isValidTime)(startTime) && !(0, validTime_1.isValidTime)(endTime)) {
            return res
                .status(400)
                .json({ error: "Start time and end time must be in the future" });
        }
        /**/
        /* try {
           const paymentIntent = await stripe.paymentIntents.create({
             amount: Math.round(total_cost * 100), // Convert to cents
             currency: "usd",
             customer:customer,
             payment_method: paymentmethodId,
             confirm: true,
           });
         } catch (err:any) {
           return res.status(400).json({ error: err.message });
         }*/
        if (parkinglot_id === null || parkinglot_id === void 0 ? void 0 : parkinglot_id.id) {
            if (parkinglot_id.capacityUsed < 0 ||
                parkinglot_id.capacityUsed >= parkinglot_id.capacity) {
                return res.status(400).json({ error: "no, free parking lots" });
            }
            else {
                const book_park = yield prisma.booking.create({
                    data: {
                        startTime: startTime,
                        endTime: endTime,
                        price: find_price,
                        isBookedCompeleted: false,
                        totalPrice: total_cost,
                        user: { connect: { id: user_id === null || user_id === void 0 ? void 0 : user_id.id } },
                        parkinglot: { connect: { id: parkinglot_id === null || parkinglot_id === void 0 ? void 0 : parkinglot_id.id } },
                    },
                    include: {
                        user: true,
                        parkinglot: { include: { vehicletype: true } },
                    },
                });
                const paymentResult = yield (0, pay_1.default)(Math.round(total_cost * 100), paymentmethodId, customer);
                if (!paymentResult.success) {
                    return res.status(400).json({ payment: paymentResult.error });
                }
                else {
                    updateParkingLotCapacityUsed = yield prisma.parkinglot.update({
                        where: { id: parkinglot_id.id },
                        data: { capacityUsed: { increment: 1 } },
                    });
                    return res.status(200).json({
                        parking: updateParkingLotCapacityUsed,
                        book: book_park,
                        paymentResult: {
                            success: paymentResult.success,
                            messages: paymentResult.message,
                        },
                    });
                }
            }
        }
        return res.status(400).json({ error: "failed to create book " });
    }));
}
exports.Book_Lot = Book_Lot;
/**else {
    
      
          updateParkingLotCapacityUsed = await prisma.parkinglot.update({
            where: { id: parkinglot_id!.id },
            data: { capacityUsed: { increment: 1 } },
          });
        
          return res.status(200).json({
            parking: updateParkingLotCapacityUsed,
            book: book_park,
          });
          
      } */ 
