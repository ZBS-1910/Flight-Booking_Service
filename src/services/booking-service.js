const axios = require("axios");
const { BookingRepository } = require("../repositories");
const db = require("../models");
const { ServerConfig } = require("../config");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");
const bookingRepository = new BookingRepository();
const { Enums } = require('../utils/common');
const { BOOKED, CANCELLED } = Enums.BOOKING_STATUS



async function createBooking(data) {
  console.log("Inside createBooking service", data);
  const transaction = await db.sequelize.transaction();
  try {
    const flight = await axios.get(
      `${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`
    );
    const flightData = flight.data.data;
    if (data.noOfSeats > flightData.totalSeats) {
      throw new AppError("No enough seats available", StatusCodes.BAD_REQUEST);
    }
    const totalBillAmount = data.noOfSeats * flightData.price;
    const bookingPayload = { ...data, totalCost: totalBillAmount };
    console.log("Booking Payload:", bookingPayload);

    const booking = await bookingRepository.create(bookingPayload, transaction);
    await axios.patch(
      `${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}/seats`,
      {
        seats: data.noOfSeats,
      }
    );

    await transaction.commit();
    return booking;
  } catch (error) {
    // console.log('Service cought error', error);
    await transaction.rollback();

    throw error;
  }
}


async function makePayment(data) {
  const transaction = await db.sequelize.transaction();
  try {
    const bookingDetails = await bookingRepository.get(data.bookingId, transaction);
    if (bookingDetails.status == CANCELLED) {
      throw new AppError('The booking has expired', StatusCodes.BAD_REQUEST);
    }
    console.log(bookingDetails);
    const bookingTime = new Date(bookingDetails.createdAt);
    const currentTime = new Date();
    console.log("Current Time:", currentTime);
    console.log("Booking Time:", bookingTime);
    console.log("Time Difference:", currentTime - bookingTime);
    if (currentTime - bookingTime > 3) {
      await cancelBooking(data.bookingId);

      //await bookingRepository.update(data.bookingId,{status:CANCELLED},transaction);
      await transaction.commit();
      throw new AppError('The booking has expired', StatusCodes.BAD_REQUEST);

    }
    if (bookingDetails.totalCost != data.totalCost) {
      throw new AppError('The amount of the payment doesnt match', StatusCodes.BAD_REQUEST);
    }
    if (bookingDetails.userId != data.userId) {
      throw new AppError('The user corresponding to the booking doesnt match', StatusCodes.BAD_REQUEST);
    }
    // we assume here that payment is successful
    await bookingRepository.update(data.bookingId, { status: BOOKED }, transaction);
    await transaction.commit();
  } catch (error) {
    //if (!transaction.finished) { // Only rollback if not already committed
    await transaction.rollback();
    //cd }
    throw error;
  }

}


async function cancelBooking(bookingId) {
  const transaction = await db.sequelize.transaction();
  try {
    const bookingDetails = await bookingRepository.get(bookingId, transaction);
    console.log(bookingDetails);
    if (bookingDetails.status == CANCELLED) {
      await transaction.commit();
      return true;
    }
    await axios.patch(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${bookingDetails.flightId}/seats`, {
      seats: bookingDetails.noofSeats,
      dec: 0
    });
    await bookingRepository.update(bookingId, { status: CANCELLED }, transaction);
    await transaction.commit();

  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

// booking-service.js
async function cancelOldBookings() {
  try {
    console.log("Inside service")
    const time = new Date(Date.now() - 1000 * 300); // time 5 mins ago
    const response = await bookingRepository.cancelOldBookings(time);

    return response;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  cancelOldBookings,
  createBooking,
  makePayment,
  cancelBooking,
};
