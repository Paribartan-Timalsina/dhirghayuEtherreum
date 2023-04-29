const mongoose=require("mongoose")
const bookingSchema = new mongoose.Schema({
    doctname: {
      type: String,
      required: true,
    },
    patientname: {
      type: String,
      required: true,
    },
    appointmentday: {
      type: Date,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 0, // initially set to 0
    },
  });
  
  // Set the TTL dynamically based on the difference between appointmentday and the current date
  bookingSchema.index({ createdAt: 1 }, { expireAfterSeconds: 0 });
  bookingSchema.post('save', function (doc) {
    const currentTime = new Date();
    const timeDifference = doc.appointmentday - currentTime;
    const timeDifferenceInSeconds = Math.floor(timeDifference / 1000);
    doc.constructor.updateOne(
      { _id: doc._id },
      { $set: { createdAt: new Date(), expires: timeDifferenceInSeconds } },
      function (error, success) {
        if (error) {
          console.log(error);
        }
      }
    );
  });
  
// Define the model
const Appointment = mongoose.model('bookingtime', bookingSchema);

// Export the model
module.exports = Appointment;