import React, { useEffect, useState } from "react";
import { deleteUser, fetchUsers, User } from "../../lib/users";
import './UsersList.css';

const GENERIC_ERRO = "An error happened when the research request was being the search";

interface UsersListProps {
  initialUsers?: User[];
}
function UsersList({ initialUsers }: UsersListProps) {

  const [users, setUsers] = useState<User[]>(initialUsers || []);
  const [selectedUsers, setSeletedUsers] = useState<{ [key: string]: User }>({});
  const [message, setMessage] = useState('');

  React.useEffect(() => {
    fetchUsers().then(users => {
      console.log("fetched users: ", users);
      setUsers(users);
    })
      .catch(e => {
        console.error(e);
        setMessage(GENERIC_ERRO);
        setUsers([]);
      })
  }, []);


  const handleUserDelete = (clientId: string, userId: string) => {
    deleteUser(clientId, userId).then(result => {
      console.log("delete user: ", result);
    }).catch(e => {
        console.error(e);
        setMessage(GENERIC_ERRO);
      })
  }

  return (
    <div>
      {message ?
        (<div className="error" >{message}</div>)
        : <></>}
      <h3>List of Users</h3>
      <table className="table">
        <thead>
          <tr>
            <th className="th" style={{width: 80}}>Client ID</th>
            <th className="th" style={{width: 80}}>User ID</th>
            <th className="th" style={{width: 120}}>Name</th>
            <th className="th" style={{width: 80}}>Email</th>
            <th className="th" style={{width: 80}}>Role</th>
            <th className="th" style={{width: 80}}>Edit</th>
            <th className="th" style={{width: 80}}>Delete</th>
          </tr>
        </thead>
        <tbody>
        {users.map((user: User) => {
            return (
            <tr key={user.id.userId}>
              <td>{user.id.clientId}</td>
              <td>{user.id.userId}</td>
              <td>{user.metadata.name}</td>
              <td>{user.metadata.email}</td>
              <td>{user.metadata.role}</td>
              <td><a href="./">Edit</a></td>
              <td><a href="./" onClick={() => handleUserDelete(user.id.clientId, user.id.userId)}>Delete</a></td>
            </tr>)
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UsersList;
