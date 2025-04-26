const { StatusCodes } = require("http-status-codes");
const { BookingService } = require("../services"); // Importing BookingService
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const inMemoryDB = {}; // In-memory database
async function createBooking(req, res) {

    try {
        const response = await BookingService.createBooking({
            flightId: req.body.flightId,
             userID: req.body.userID,
             noOfSeats: req.body.noOfSeats
            
        });
        SuccessResponse.data = response;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}

async function makePayment(req, res) {
  try {
    const idempotencyKey = req.headers['x-idempotency-key'];
    if(!idempotencyKey ) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({message: 'idempotency key missing'});
    }
    if(inMemoryDB[idempotencyKey]) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({message: 'Cannot retry on a successful payment'});
    } 
      const response = await BookingService.makePayment({
          totalCost: req.body.totalCost,
          userId: req.body.userId,
          bookingId: req.body.bookingId
      });
      inMemoryDB[idempotencyKey] = idempotencyKey;
      SuccessResponse.data = response;
         return res
                 .status(StatusCodes.OK)
                 .json(SuccessResponse);
     } catch(error) {
      console.log('Controller caught error', error);
         ErrorResponse.error = error;

         return res
                 .status(StatusCodes.INTERNAL_SERVER_ERROR)
                 .json(ErrorResponse);
     }
 }
module.exports = {
  createBooking,
   makePayment
};
