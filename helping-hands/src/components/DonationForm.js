import DonationForm from './components/DonationForm';

import React, { useState } from 'react';

const DonationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState(0);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform donation submission logic here, e.g., send data to the server

    // Reset form fields
    setName('');
    setEmail('');
    setAmount(0);

    // Display success message or perform any other desired action
    console.log('Donation submitted successfully!');
  };

  return (
    <div>
      <h2>Make a Donation</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
            required
          />
        </div>
        <button type="submit">Donate</button>
      </form>
    </div>
  );
};

export default DonationForm;

