import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loginUser, { error }] = useMutation(LOGIN_USER);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({
        variables: { ...formData },
      });
      // handle successful login here
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit">Log In</button>
      </form>
      {error && <p>Error logging in. Please try again.</p>}
    </div>
  );
}

export default Login;
