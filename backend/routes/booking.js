const express =
  require("express");

const Booking =
  require("../models/Booking");

const Worker =
  require("../models/Worker");

const auth =
  require("../middleware/auth");


const router =
  express.Router();



/* CREATE BOOKING */

router.post(
  "/",
  auth,
  async (req,res) => {

    try {

      if (
        req.user.role !==
        "customer"
      ) {

        return res.status(403).json({

          message:
            "Only customers can book"

        });

      }


      const {
        workerId,
        service,
        customerOffer,
        bookingDate
      } = req.body;


      const worker =
        await Worker.findById(
          workerId
        );


      if (!worker) {

        return res.status(404).json({

          message:
            "Worker not found"

        });

      }


      const booking =
        await Booking.create({

          customer:
            req.user.id,

          worker:
            workerId,

          service,

          customerOffer,

          bookingDate,

          status:
            "negotiating"

        });


      res.status(201).json({

        message:
          "Booking request sent",

        booking

      });


    } catch(error) {

      res.status(500).json({

        message:
          "Booking failed"

      });

    }

  }
);



/* WORKER COUNTER OFFER */

router.put(
  "/:id/counter",
  auth,
  async (req,res) => {

    try {

      const {
        workerOffer
      } = req.body;


      const booking =
        await Booking.findById(
          req.params.id
        );


      if (!booking) {

        return res.status(404).json({

          message:
            "Booking not found"

        });

      }


      const worker =
        await Worker.findById(
          booking.worker
        );


      if (
        !worker ||
        worker.user.toString() !==
        req.user.id
      ) {

        return res.status(403).json({

          message:
            "Not authorized"

        });

      }


      booking.workerOffer =
        workerOffer;

      booking.status =
        "negotiating";


      await booking.save();


      res.json({

        message:
          "Counter offer sent",

        booking

      });


    } catch(error) {

      res.status(500).json({

        message:
          "Counter offer failed"

      });

    }

  }
);



/* WORKER ACCEPT */

router.put(
  "/:id/accept",
  auth,
  async (req,res) => {

    try {

      const booking =
        await Booking.findById(
          req.params.id
        );


      if (!booking) {

        return res.status(404).json({

          message:
            "Booking not found"

        });

      }


      const worker =
        await Worker.findById(
          booking.worker
        );


      if (
        req.user.role !==
        "worker" ||

        worker.user.toString() !==
        req.user.id
      ) {

        return res.status(403).json({

          message:
            "Not authorized"

        });

      }


      booking.status =
        "accepted";


      await booking.save();


      res.json({

        message:
          "Booking accepted",

        booking

      });


    } catch(error) {

      res.status(500).json({

        message:
          "Could not accept"

      });

    }

  }
);



/* CUSTOMER ACCEPT */

router.put(
  "/:id/customer-accept",
  auth,
  async (req,res) => {

    try {

      const booking =
        await Booking.findById(
          req.params.id
        );


      if (!booking) {

        return res.status(404).json({

          message:
            "Booking not found"

        });

      }


      if (
        booking.customer.toString()
        !== req.user.id
      ) {

        return res.status(403).json({

          message:
            "Not authorized"

        });

      }


      booking.status =
        "accepted";


      await booking.save();


      res.json({

        message:
          "Deal confirmed 🎉",

        booking

      });


    } catch(error) {

      res.status(500).json({

        message:
          "Could not confirm"

      });

    }

  }
);



/* MY BOOKINGS */

router.get(
  "/my",
  auth,
  async (req,res) => {

    try {

      let bookings;


      if (
        req.user.role ===
        "customer"
      ) {

        bookings =
          await Booking

            .find({
              customer:
                req.user.id
            })

            .populate(
              "worker"
            );

      } else {

        const workers =
          await Worker.find({

            user:
              req.user.id

          });


        const ids =
          workers.map(
            worker =>
              worker._id
          );


        bookings =
          await Booking

            .find({

              worker: {
                $in: ids
              }

            })

            .populate(
              "customer",
              "name phone"
            );

      }


      res.json({

        count:
          bookings.length,

        bookings

      });


    } catch(error) {

      res.status(500).json({

        message:
          "Could not fetch bookings"

      });

    }

  }
);


module.exports =
  router;