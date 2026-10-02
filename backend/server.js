const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();


const authRoutes =
  require("./routes/auth");

const workerRoutes =
  require("./routes/workers");

const bookingRoutes =
  require("./routes/bookings");


const app =
  express();


app.use(cors());

app.use(express.json());


app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/workers",
  workerRoutes
);

app.use(
  "/api/bookings",
  bookingRoutes
);


app.get("/", (req,res) => {

  res.json({
    message:
      "KaamConnect API is running 🚀"
  });

});


mongoose
  .connect(process.env.MONGO_URI)

  .then(() => {

    console.log(
      "MongoDB Connected ✅"
    );

    const PORT =
      process.env.PORT || 5000;

    app.listen(
      PORT,
      () => {

        console.log(
          `Server running on http://localhost:${PORT}`
        );

      }
    );

  })

  .catch(error => {

    console.error(
      "MongoDB Error:",
      error.message
    );

  });