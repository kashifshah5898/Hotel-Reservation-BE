const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
var colors = require("colors");
dotenv.config();
const port = process.env.PORT || 5000;
const { errorHandler } = require("./middleWare/errorMiddleWare");
const connectDB = require("./config/db");

connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/users", require("./routes/usersRoutes"));
app.use("/api/rooms", require("./routes/roomRoutes"));
app.use("/api/booking", require("./routes/bookingRoutes"));

app.use(errorHandler);
app.listen(port, () => {
  console.log(`-----server is listening on port: ${port}-----`.green);
});
