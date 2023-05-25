const { Schema, model } = require('mongoose');

const donationSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  donor: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: 'School'
  }
  // include any other fields you need for a donation
});

const Donation = model('Donation', donationSchema);

module.exports = Donation;
