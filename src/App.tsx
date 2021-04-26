import './App.css';
import UsersList from './components/UsersList/UsersList';
import UserNew from './components/UserNew';
import { useState } from 'react';
import { User } from './lib/users';

function App() {

  const [users] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>();


  return (
    <div>
      <UserNew users={users} user={selectedUser}/>
      <UsersList initialUsers={users} onUserChange={setSelectedUser} />
    </div>
  );
}

export default App;
