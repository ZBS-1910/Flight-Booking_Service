const express = require('express');
const { ServerConfig } = require('./config');  // Use ServerConfig for PORT
const apiroutes = require('./routes');
const logger = require('./config/logger-config');  // Use logger for logging
const CRON = require('./utils/common/cron-jobs');
const app = express();
const axios= require('axios');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/bookingsService/api', apiroutes);
app.use('/api', apiroutes);


app.listen(ServerConfig.PORT, async () => {    
    console.log(`Server is up and running on port ${ServerConfig.PORT}`);
    logger.info(`Booking Service is started.....`);
    
    CRON.scheduleCrons();
});
