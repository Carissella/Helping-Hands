const db = require('../config/connection');
const { User, Donation, School } = require('../models');

const userData = require("./userData.json");
const donationData = require("./donationData.json");
const schoolData = require("./schoolData.json");


db.once('open', async () => {
    try {
      await User.deleteMany({});
      await Donation.deleteMany({});
      await School.deleteMany({});
  
      const users = await User.insertMany(userData);
      const donations = await Donation.insertMany(donationData);
      const schools = await School.insertMany(schoolData)
  
      for (newDonation of donations) {
        const tempDonation = schools[Math.floor(Math.random() * schools.length)];
        tempDonation.donations.push(newDonation._id);
        await tempDonation.save();

        const tempRecipient = users[Math.floor(Math.random() * users.length)];
    newDonation.users = tempRecipient._id;
    await newDonation.save();

    tempRecipient.donations.push(newDonation._id);
    await tempRecipient.save();
      };
    } catch (err) {
      console.error(err);
      process.exit(1);
    };
  
    console.log('all done!');
    process.exit(0);
  });
  