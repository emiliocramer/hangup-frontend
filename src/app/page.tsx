"use client";
import axios from 'axios';
import React, { useState } from 'react';

const CreateTwilioUserPage = () => {
  const [accountSid, setAccountSid] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5014/api/twilio/create-user', {
        account_sid: accountSid,
        auth_token: authToken });
      alert(response.data.message);
    } catch (err) {
      console.log(err)
      if (axios.isAxiosError(err)) {
        const errorResponse = err?.response?.data || 'An unexpected error occurred. Please try again.';
        setError(errorResponse);
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
    }
  };

  return (
      <div>
        <h1>Add a Twilio User</h1>
        <form onSubmit={handleSubmit}>
          <input
              className="w-full p-2 border border-gray-300 rounded-md text-black" // Added text-black here
              type="text"
              placeholder="Account SID"
              value={accountSid}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAccountSid(e.target.value)}
          />
          <input
              className="w-full p-2 border border-gray-300 rounded-md text-black" // Added text-black here
              type="password"
              placeholder="Auth Token"
              value={authToken}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthToken(e.target.value)}
          />
          <button className="w-full p-2 bg-blue-500 text-white rounded-md" type="submit">Submit</button>
        </form>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
  );
};

export default CreateTwilioUserPage;
