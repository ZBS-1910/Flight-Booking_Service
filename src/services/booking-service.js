const axios= require('axios');
const {BookingRepository} = require('../repositories');
const db= require('../models');
const {ServerConfig}=require('../config');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');
const bookingRepository = new BookingRepository
async function createBooking(data){
  console.log('Inside createBooking service',data);
const transaction =await db.sequelize.transaction();
  try {
      const flight=await axios.get(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`);
      const flightData=flight.data.data;
      if(data.noOfSeats  > flightData.totalSeats){

        throw new AppError('No enough seats available', StatusCodes.BAD_REQUEST);
      }
      const totalBillAmount=data.noOfSeats *flightData.price;
      const bookingPayload={...data,totalCost:totalBillAmount};
      console.log('Booking Payload:', bookingPayload);

      const booking = await bookingRepository.create(bookingPayload,transaction );
      await axios.patch(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}/seats`,{
        seats:data.noOfSeats
      });
     
      await transaction.commit();
    return booking;
  }
catch(error) {
 // console.log('Service cought error', error);
  await transaction.rollback();
  
  throw error;
}
}



module.exports={
  createBooking
}