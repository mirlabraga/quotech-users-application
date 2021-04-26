import React, { useState } from "react";
import { Metadata, saveUser, User, Id } from "../../lib/users";
import "./UserNew.css"

interface UsersListProps {
  users?: User[];
}

export function UserNew({ users }: UsersListProps) {

  const [userId, setUserId] = useState("");
  const [clientId, setClientId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (evt: any) => {
      evt.preventDefault();
      const metada = {name: name, email: email, role: role} as Metadata;
      const id =  {clientId: clientId, userId: userId} as Id;
      const user = new User(metada, id);
      save(user);
  }

  const save = (user: User) => {
    saveUser(user).then(result => {
      console.log("save user: ", result);
    }).catch(e => {
        console.error(e);
      })

      users = [];
  }

  return (
    <form onSubmit={handleSubmit}>
      <table className="table">
      <tr>
        <th className="th">Add User</th>
        <th className="th"></th>
      </tr>
      <tr>
        <td>User Id</td>
        <td><input type="text" value={userId} onChange={e => setUserId(e.target.value)}/></td>
      </tr>
      <tr>
        <td>Client Id</td>
        <td><input type="text" value={clientId} onChange={e => setClientId(e.target.value)}/></td>
      </tr>
      <tr>
        <td>Name</td>
        <td><input type="text" value={name} onChange={e => setName(e.target.value)}/></td>
      </tr>
      <tr>
        <td>E-mail</td>
        <td><input type="text" value={email} onChange={e => setEmail(e.target.value)}/></td>
      </tr>
      <tr>
        <td>Role</td>
        <td><input type="text" value={role} onChange={e =>setRole(e.target.value)}/></td>
      </tr>
      <tr>
        <td><input type="submit" value="Save" /></td>
      </tr>
    </table>
    </form>
  );
}

export default UserNew;
