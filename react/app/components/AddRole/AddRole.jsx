import axiosClient, { updateUserRole } from '@/app/axios-client';
import { useEffect, useState } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [newRoles, setNewRoles] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosClient.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = (userId, newRole) => {
    setNewRoles((prevRoles) => ({
      ...prevRoles,
      [userId]: newRole,
    }));
  };

  const handleUpdateRoles = async () => {
    try {
      await Promise.all(
        users.map((user) => {
          const newRole = newRoles[user.id];
          if (newRole && newRole !== user.role) {
            return updateUserRole(user.id, { role: newRole });
          }
          return Promise.resolve();
        })
      );
      // Оновити список користувачів після зміни ролей
      const response = await axiosClient.get('/users');
      setUsers(response.data);
      setNewRoles({});
    } catch (error) {
      console.error('Error updating user roles:', error);
    }
  };

  return (
    <div>
      <div className='flex justify-between'>
        <h2>User List</h2>
        <button className="btn" onClick={handleUpdateRoles}>
          Update Roles
        </button>
      </div>
      <table className="mt-2">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>New Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <select
                  value={newRoles[user.id] || user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                >
                  <option value="dev">Developer</option>
                  <option value="PM">Project Manager</option>
                  <option value="Team Lead">Team Lead</option>
                  <option value="CEO">CEO</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
