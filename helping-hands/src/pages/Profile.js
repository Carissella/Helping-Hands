import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../queries';

function Profile() {
  // useQuery hook to get user profile
  const { loading, errror, data } = useQuery(GET_ME);

  // ... handle loading, error and data states
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const user = data.me;

  return (
    <div>
      <h1>Your Profile</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
      
    </div>
  );
}

export default Profile;
