'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

const Home = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [users, setUsers] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/users`, {
        method: 'POST',
        mode: 'same-origin',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      if (res.ok) {
        console.log('Request succeeded');
      } else {
        console.log('Request failed with status:', res.status);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  // fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/users`);
        setUsers(res?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [name, email, users]);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/users/${id}`);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border border-red-500">
      <form onSubmit={handleSubmit} className="w-1/2 mx-auto shadow">
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 w-full"
        />
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <hr />
      <ul>
        {users?.map((user) => (
          <li key={user._id}>
            <span>{user.name}</span>
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
