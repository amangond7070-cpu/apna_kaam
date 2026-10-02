const express =
  require("express");

const bcrypt =
  require("bcryptjs");

const jwt =
  require("jsonwebtoken");

const User =
  require("../models/User");


const router =
  express.Router();



router.post(
  "/register",
  async (req,res) => {

    try {

      const {
        name,
        phone,
        password,
        role,
        location
      } = req.body;


      if (
        !name ||
        !phone ||
        !password
      ) {

        return res.status(400).json({

          message:
            "Name, phone and password required"

        });

      }


      const existingUser =
        await User.findOne({
          phone
        });


      if (existingUser) {

        return res.status(400).json({

          message:
            "User already exists"

        });

      }


      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );


      const user =
        await User.create({

          name,

          phone,

          password:
            hashedPassword,

          role:
            role || "customer",

          location:
            location || ""

        });


      res.status(201).json({

        message:
          "Registration successful",

        user: {

          id: user._id,

          name: user.name,

          phone: user.phone,

          role: user.role

        }

      });


    } catch(error) {

      res.status(500).json({

        message:
          "Registration failed"

      });

    }

  }
);



router.post(
  "/login",
  async (req,res) => {

    try {

      const {
        phone,
        password
      } = req.body;


      const user =
        await User.findOne({
          phone
        });


      if (!user) {

        return res.status(401).json({

          message:
            "Invalid phone or password"

        });

      }


      const match =
        await bcrypt.compare(
          password,
          user.password
        );


      if (!match) {

        return res.status(401).json({

          message:
            "Invalid phone or password"

        });

      }


      const token =
        jwt.sign(

          {
            id:
              user._id,

            role:
              user.role
          },

          process.env.JWT_SECRET,

          {
            expiresIn:
              "7d"
          }

        );


      res.json({

        message:
          "Login successful",

        token,

        user: {

          id:
            user._id,

          name:
            user.name,

          phone:
            user.phone,

          role:
            user.role,

          location:
            user.location

        }

      });


    } catch(error) {

      res.status(500).json({

        message:
          "Login failed"

      });

    }

  }
);


module.exports =
  router;