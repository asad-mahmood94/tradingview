import React, { useEffect, useState } from 'react';
import Navbar from './navbar';

function UserList() {
  const [users, setUsers] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null); // Track which user is expanded
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Toggle roll number on click
  const handleToggle = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
    <div className='whole'>
      <Navbar />
      <h2>User List</h2>
      <ul style={{ color: 'black' }}>
        {users.map((user, index) => (
          <li
            key={index}
            onClick={() => handleToggle(index)}
            style={{
              cursor: 'pointer',
              marginBottom: '10px',
              background: '#f0f0f0',
              padding: '10px',
              borderRadius: '5px',
              width: '300px'
            }}
          >
            <strong>{user.name}</strong>
            {expandedIndex === index && (
              <div style={{ marginTop: '5px' }}>Roll Number: {user.rollNumber}</div>
            )}
          </li>
        ))}
      </ul>
      </div>
    </>
  );
}

export default UserList