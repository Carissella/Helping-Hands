const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    preferences: String
  }

  type School {
    _id: ID
    name: String
    district: String
    needs: String
    location: String
  }

  type Donation {
    _id: ID!
    type: String!
    donor: User!
    recipient: School!
    status: String!
    progress: Int
    history: [History]
  }

  type History {
    status: String
    date: String
  }

  type Query {
    users: [User]
    schools: [School]
    donations: [Donation]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, preferences: String): User
    addSchool(name: String!, district: String!, needs: [String!]!, location: String): School
    addDonation(type: String!, donor: ID!, recipient: ID!): Donation
  }
`;

module.exports = typeDefs;