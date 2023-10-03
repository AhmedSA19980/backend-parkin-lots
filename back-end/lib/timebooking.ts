import { PrismaClient } from "@prisma/client";
import { localTime } from "./localtime";
import { id } from "date-fns/locale";
const prisma = new PrismaClient();



export async function updateParkingLotCapacity (){
  // Find all bookings that have ended

  const compeletedBookings = await prisma.booking.findMany({
    where: {

      endTime: {
        lt: new Date(),
      },
    },
    include: { parkinglot: true },
  });
 
  // Update the capacity of the associated parking lots
  for(const booking of compeletedBookings) {
    const time = localTime(booking.endTime)

     if (( booking && new Date() >  booking.endTime)  &&
      !booking.capacityUsedDecremented) {
      // Decrement capacityUsed by 1
      await prisma.parkinglot.update({
        where: { id: booking.parkinglot.id },
        data: { capacityUsed: { decrement: 1 } },
      });

      // Set capacityUsedDecremented to true
      await prisma.booking.update({
        where: { id: booking.id },
        data: { capacityUsedDecremented: true, isBookedCompeleted: true },
      });
     }
    }
      
   
  
}

     
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