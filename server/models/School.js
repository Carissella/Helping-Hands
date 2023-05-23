const { Schema, model } = require('mongoose');

const SchoolSchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    donations: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Donation'
      }
    ],
    
  });
const School = model('School', SchoolSchema);

module.exports = School;
