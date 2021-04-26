import React, { useEffect, useState } from "react";
import { Metadata, saveUser, User, Id, updateUser } from "../../lib/users";
import "./UserNew.css"

interface UsersListProps {
  users?: User[];
  user?: User;
}

export function UserNew({ users, user }: UsersListProps) {

  const [userId, setUserId] = useState("" || user?.id.userId);
  const [clientId, setClientId] = useState("" || user?.id.clientId);
  const [name, setName] = useState("" || user?.metadata.name);
  const [email, setEmail] = useState("" || user?.metadata.email);
  const [role, setRole] = useState("" || user?.metadata.role);
  const [disabledId, seDisabledId] = useState(true);

  useEffect(() => {
    if (user) {
      setUserId(user.id.userId);
      setClientId(user.id.clientId);
      setName(user.metadata.name);
      setEmail(user.metadata.email);
      setRole(user.metadata.role);
      seDisabledId(false);
    }
  }, [user, disabledId])

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
      cleanForm();
  }

  const cleanForm = () => {
    setUserId("");
    setClientId("");
    setName("");
    setEmail("");
    setRole("");
    user = undefined;
    seDisabledId(true);
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
        <td><input type="text" value={userId} disabled={!disabledId} onChange={e => setUserId(e.target.value)}/></td>
      </tr>
      <tr>
        <td>Client Id</td>
        <td><input type="text" value={clientId} disabled={!disabledId} onChange={e => setClientId(e.target.value)}/></td>
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
