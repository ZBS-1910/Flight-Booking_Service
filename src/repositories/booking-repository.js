const {StatusCodes}=require('http-status-codes');
const { Logger } = require('../config');

const {Booking}= require('../models');
const CrudRepository = require('./crud-repository');

class BookingRepository extends CrudRepository {
    constructor() {
        super(Booking);
    }
}

module.exports = BookingRepository;