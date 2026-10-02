const mongoose =
  require("mongoose");


const bookingSchema =
  new mongoose.Schema({

    customer: {
      type:
        mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true
    },

    worker: {
      type:
        mongoose.Schema.Types.ObjectId,

      ref: "Worker",

      required: true
    },

    service: {
      type: String,
      required: true
    },

    customerOffer: {
      type: Number,
      required: true
    },

    workerOffer: {
      type: Number,
      default: null
    },

    bookingDate: {
      type: Date,
      required: true
    },

    status: {

      type: String,

      enum: [
        "pending",
        "negotiating",
        "accepted",
        "rejected",
        "completed",
        "cancelled"
      ],

      default: "pending"

    }

  }, {

    timestamps: true

  });


module.exports =
  mongoose.model(
    "Booking",
    bookingSchema
  );