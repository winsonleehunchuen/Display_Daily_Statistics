import React from 'react';

function UserSelector({ users, onSelect }) {
  const handleChange = (event) => {
    onSelect(event.target.value);
  };

  return (
    <div className="user-selector">
      <label>Select User: </label>
      <select onChange={handleChange}>
        <option value="">Select...</option>
        {users.map(user => (
          <option key={user.UserID} value={user.UserID}>{user.UserName}</option>
        ))}
      </select>
    </div>
  );
}

export default UserSelector;
