process.env.TZ = "Asia/Jakarta";
const serverless = require('serverless-http');
const express = require("express");
const routes = require("./src/routes/routes");
const bodyParser = require('body-parser');
const cors = require('cors');
const index = express();

index.use(cors());
index.use(bodyParser.json({limit: "50mb"}));
index.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:500000}));
index.use("/",routes);

// remove on lambda
index.listen(8000, function () {
    console.log("http://localhost:" + 8000);
});
// end of remove on lambda

module.exports.main = serverless(index);
