const express = require('express');  
const cors = require('cors');       
const apiRouter = require('./src/routes/index.routes.js');  // No {} needed for default export

const app = express();

app.use(cors());

app.use('/api', apiRouter);

app.listen(8080, () => {
    console.log("Server started on port 8080");
});
