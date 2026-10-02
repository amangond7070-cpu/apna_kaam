const express =
  require("express");

const Worker =
  require("../models/Worker");

const auth =
  require("../middleware/auth");


const router =
  express.Router();



router.post(
  "/",
  auth,
  async (req,res) => {

    try {

      if (
        req.user.role !==
        "worker"
      ) {

        return res.status(403).json({

          message:
            "Only workers allowed"

        });

      }


      const {
        service,
        experience,
        price,
        location,
        description
      } = req.body;


      const worker =
        await Worker.create({

          user:
            req.user.id,

          service,

          experience:
            experience || 0,

          price:
            price || 0,

          location,

          description:
            description || ""

        });


      res.status(201).json({

        message:
          "Worker profile created",

        worker

      });


    } catch(error) {

      res.status(500).json({

        message:
          "Could not create worker"

      });

    }

  }
);



router.get(
  "/",
  async (req,res) => {

    try {

      const {
        service,
        location
      } = req.query;


      const filter = {

        available:
          true

      };


      if (service) {

        filter.service = {

          $regex:
            service,

          $options:
            "i"

        };

      }


      if (location) {

        filter.location = {

          $regex:
            location,

          $options:
            "i"

        };

      }


      const workers =
        await Worker

          .find(filter)

          .populate(
            "user",
            "name phone"
          );


      res.json({

        count:
          workers.length,

        workers

      });


    } catch(error) {

      res.status(500).json({

        message:
          "Could not fetch workers"

      });

    }

  }
);


module.exports =
  router;