const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');
const { User, School, Donation } = require('../models');
const { signToken } = require('../utils/auth');
const bcrypt = require('bcryptjs');

const signToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      username: user.username,
    },
    process.env.SECRET_KEY, // Retrieve the secret key from the environment variable
    {
      expiresIn: '24h', // token will expire in 24 hours
    }
  );
};

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('donations');
    },
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId }).populate('donations');
    },
    schools: async () => {
      return School.find().sort({ createdAt: -1 });
    },
    school: async (parent, { schoolId }) => {
      return School.findOne({ _id: schoolId });
    },
    donations: async () => {
      return Donation.find().sort({ createdAt: -1 });
    },
    donation: async (parent, { donationId }) => {
      return Donation.findOne({ _id: donationId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('donations');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username, email, password: hashedPassword });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await bcrypt.compare(password, user.password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addSchool: async (parent, args) => {
      return School.create(args);
    },
    addDonation: async (parent, { type, donor, recipient }, context) => {
      if (context.user) {
        const donation = await Donation.create({
          type,
          donor,
          recipient,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { donations: donation._id } }
        );

        return donation;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    remove: async (parent, { donationId }, context) => {
      if (context.user) {
        const donation = await Donation.findOneAndDelete({
          _id: donationId,
          donor: context.user._id,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { donations: donation._id } }
        );

        return donation;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;

