const VERSION_API = process.env.VERSION_API || "v1"
const URL_BASE = process.env.REACT_APP_BACKEND_URL_BASE || `http://localhost:8080/api/${VERSION_API}`;

export interface Metadata {
  name: string,
  email: string,
  role: string
}

export interface Id {
  clientId: string,
  userId: string
}

export class User {

  constructor(public metadata: Metadata, public id: Id) {
  }
}

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`${URL_BASE}/users`);
  if (response.ok) {
    return (await response.json());
  } else {
    throw new Error(`Coulnd't fetch users: ${response.text()}. Status: ${response.status}`);
  }
}

export const saveUser = async (user: User): Promise<any> => {
  const response = await fetch(`${URL_BASE}/users`, {method: "POST", body: JSON.stringify(user),
    headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}})
  if (response.ok) {
    return (await response.json());
  } else {
    throw new Error(`Coulnd't fetch users: ${response.text()}. Status: ${response.status}`);
  }
}


export const deleteUser = async (clientId: string, userId: string): Promise<any> => {
  const response = await fetch(`${URL_BASE}/users/${userId}/client/${clientId}`, { method: "DELETE" });
  if (response.ok) {
    return (await response.json());
  } else {
    throw new Error(`Coulnd't delete user: ${response.text()}. Status: ${response.status}`);
  }
}
