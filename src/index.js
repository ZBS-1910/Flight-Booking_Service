const express = require('express');
const { ServerConfig } = require('./config');  // Use ServerConfig for PORT
const apiroutes = require('./routes');
const logger = require('./config/logger-config');  // Use logger for logging
const CRON = require('./utils/common/cron-jobs');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiroutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Server is up and running on port ${ServerConfig.PORT}`);
    logger.info(`Successfully started the server on port ${ServerConfig.PORT}`);
    CRON.scheduleCrons();

});
