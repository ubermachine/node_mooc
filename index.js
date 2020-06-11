const express = require("express"),
  http = require("http");
const morgan = require("morgan");
const hostname = "localhost";
const port = 3000;
const bodyParser = require("body-parser");
const app = express();
const dishRouter = require("./routes/dishRouter");
var leaderRouter = require("./routes/leaderRouter");
var promoRouter = require("./routes/promoRouter");

app.use("/dishes", dishRouter);
app.use("/promotions", promoRouter.router);
app.use("/leadership", leaderRouter.router);

app.use(morgan("dev"));

app.use(express.static(__dirname + "/public"));

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
