import './App.css';
import UsersList from './components/UsersList/UsersList';
import UserNew from './components/UserNew';
import { useState } from 'react';
import { User } from './lib/users';

function App() {

  const [users, setUsers] = useState<User[]>([]);

  return (
    <div>
      <UserNew users={users}/>
      <UsersList initialUsers={users}/>
    </div>
  );
}

export default App;
