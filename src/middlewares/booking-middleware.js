const { StatusCodes } = require('http-status-codes');
 
 const { ErrorResponse } = require('../utils/common');
 const AppError = require('../utils/errors/app-error');


function validateCreateBooking(req, res, next) {
    if(!req.body.flightId) {
        ErrorResponse.message = 'Something went wrong while createing booking flight';
        ErrorResponse.error = new AppError(['flightId not found in the incoming request or correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.userID) {
        ErrorResponse.message = 'Something went wrong while createing booking flight';
        ErrorResponse.error = new AppError(['userID  not found in the incoming request or correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.noOfSeats) {
        ErrorResponse.message = 'Something went wrong while createing booking flight';
        ErrorResponse.error = new AppError(['noOfSeats  not found in the incoming request or currect form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}


function validateBookingPayment(req,res,next){
    if(!req.body.totalCost) {
        ErrorResponse.message = 'Something went wrong while making payment to booking flight';
        ErrorResponse.error = new AppError(['totalCost not found in the incoming request or correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.userID) {
        ErrorResponse.message = 'Something went wrong while making payment to booking flight';
        ErrorResponse.error = new AppError(['userID  not found in the incoming request or correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.bookingId) {
        ErrorResponse.message = 'Something went wrong while making payment to booking flight';
        ErrorResponse.error = new AppError(['bookingId  not found in the incoming request or correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}

module.exports={

    validateCreateBooking,
    validateBookingPayment

}