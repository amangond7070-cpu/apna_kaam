const mongoose =
  require("mongoose");


const workerSchema =
  new mongoose.Schema({

    user: {
      type:
        mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true
    },

    service: {
      type: String,
      required: true
    },

    experience: {
      type: Number,
      default: 0
    },

    price: {
      type: Number,
      default: 0
    },

    location: {
      type: String,
      required: true
    },

    description: {
      type: String,
      default: ""
    },

    rating: {
      type: Number,
      default: 0
    },

    available: {
      type: Boolean,
      default: true
    }

  }, {

    timestamps: true

  });


module.exports =
  mongoose.model(
    "worker",
    workerSchema
  );