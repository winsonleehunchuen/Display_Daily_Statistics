import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserSelector from './UserSelector';
import DailyStatistics from './DailyStatistics';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Fetch user list from API
    axios.get('https://exam-vitalz-backend-8267f8929b82.herokuapp.com/api/getUserList')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching user list:', error);
      });
  }, []);

  const handleUserSelect = (userId) => {
    const user = users.find(user => user.UserID === userId);
    setSelectedUser(user);
  };

  return (
    <div className="App">
      <header>
        <h1>User Daily Statistics</h1>
      </header>
      <div className="content">
        <UserSelector users={users} onSelect={handleUserSelect} />
        {selectedUser && <DailyStatistics user={selectedUser} />}
      </div>
    </div>
  );
}

export default App;
