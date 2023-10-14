//Import database config
require('./src/config/database.config')
const express = require('express');
const fileupload = require('express-fileupload')
const apiVersion1 = require('./src/config/versioning/v1')
const { notFound, appErrorHandler, genericErrorHandler } = require('./src/middlewares/error.middleware')
const envConfig = require('./src/config/env/index')

const cors = require('cors');

const app = express();

app.use(cors());
app.use(fileupload({useTempFiles:true}))
app.use(express.json())

const PORT = envConfig.APP_PORT || 6001;



app.listen(PORT, () => {
    console.log(`Application running on port ${PORT}`)
})

app.use('/api/v1', apiVersion1);
app.use(appErrorHandler);
app.use(genericErrorHandler);
app.use(notFound)


module.exports = app;