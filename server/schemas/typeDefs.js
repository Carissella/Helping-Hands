const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
  }

  type School {
    _id: ID
    name: String
    donations: String
  }

  type Donation {
    _id: ID!
    type: String!
    donor: User!
    recipient: School!
    status: String!
  }

  type History {
    status: String
    date: String
  }

  input UserProfileInput {
    firstName: String
    lastName: String
    contactInfo: String
    preferences: [String]
  }
  
  type Query {
    users: [User]
    user(userId: ID!): User
    schools: [School]
    school(schoolId: ID!): School
    donations: [Donation]
    donation(donationId: ID!): Donation
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, preferences: String): Auth
    login(email: String!, password: String!): Auth
    updateUser(userId: ID!, input: UserProfileInput): User
    addSchool(name: String!, district: String!, needs: [String!]!, location: String): School
    addDonation(type: String!, donor: ID!, recipient: ID!): Donation
    remove(donationId: ID!): Donation
  }
`;

module.exports = typeDefs;