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
exports.updateParkingLotCapacity = void 0;
const client_1 = require("@prisma/client");
const localtime_1 = require("./localtime");
const prisma = new client_1.PrismaClient();
function updateParkingLotCapacity() {
    return __awaiter(this, void 0, void 0, function* () {
        // Find all bookings that have ended
        const compeletedBookings = yield prisma.booking.findMany({
            where: {
                endTime: {
                    lt: new Date(),
                },
            },
            include: { parkinglot: true },
        });
        // Update the capacity of the associated parking lots
        for (const booking of compeletedBookings) {
            const time = (0, localtime_1.localTime)(booking.endTime);
            if ((booking && new Date() > booking.endTime) &&
                !booking.capacityUsedDecremented) {
                // Decrement capacityUsed by 1
                yield prisma.parkinglot.update({
                    where: { id: booking.parkinglot.id },
                    data: { capacityUsed: { decrement: 1 } },
                });
                // Set capacityUsedDecremented to true
                yield prisma.booking.update({
                    where: { id: booking.id },
                    data: { capacityUsedDecremented: true, isBookedCompeleted: true },
                });
            }
        }
    });
}
exports.updateParkingLotCapacity = updateParkingLotCapacity;
/*if (
      time &&
      booking.parkinglot.capacityUsed > -1 &&
      booking.parkinglot.capacityUsed <= booking.parkinglot.capacity
    ){
        const t =await  prisma.parkinglot.update({
           where: { id: booking.parkinglot.id },
           data: {
             capacityUsed: { decrement: 1 },
             booking: {
               update: {
                 where: { id: booking.parkingLotId },
                 data: {
                   capacityUsedDecremented: true,
                   isBookedCompeleted: true,
                 },
               },
             },
           },
         );
           t
         if (!booking.capacityUsedDecremented &&  t) {
           await prisma.booking.update({
             where: { id: booking.parkingLotId },
             data: { capacityUsedDecremented: true, isBookedCompeleted: true },
           });
         }*/
/**/ 
