import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import User from './types/User';
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.json());

// Initialize the users array with some initial data
const users: User[] = [
  { id: 1, login: 'John', password: 'pass123', age: 25, isDeleted: false },
  { id: 2, login: 'Jane', password: 'pass456', age: 30, isDeleted: false },
  { id: 3, login: 'Bob', password: 'pass789', age: 35, isDeleted: false }
];


// Create a new user
app.post('/users', (req, res) => {
  const { login, password, age, isDeleted } = req.body;
  const user: User = {
    id: users.length + 1,
    uuid: uuidv4(),
    login,
    password,
    age,
    isDeleted,
  };
  users.push(user);
  res.send(user);
});

// Get user by id
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === parseInt(id));
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ error: 'User not found' });
  }
});

// update user
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { login, password, age, isDeleted } = req.body;
  const index = users.findIndex(u => u.id === parseInt(id));
  if (index !== -1) {
    const user = { login, password, age, isDeleted };
    users[index] = user;
    res.send(user);
  } else {
    res.status(404).send({ error: 'User not found' });
  }
});

// auto-suggest users (login substring)
app.get('/users/suggest/:loginSubstring/:limit', (req, res) => {
  const { loginSubstring, limit } = req.params;
  const filteredUsers = users
    .filter(user => user.login.includes(loginSubstring))
    .sort((a, b) => a.login.localeCompare(b.login))
    .slice(0, parseInt(limit));
  res.send(filteredUsers);
});

// auto-suggest users function
const autoSuggestUsers = (loginSubstring: string, limit: number): User[] => {
  const filteredUsers = users
    .filter(user => user.login.includes(loginSubstring))
    .sort((a, b) => a.login.localeCompare(b.login))
    .slice(0, limit);
  return filteredUsers;
};

// delete user
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const index = users.findIndex(u => u.id === parseInt(id));
  if (index !== -1) {
    users[index].isDeleted = true;
    res.send({ message: 'User deleted successfully' });
  } else {
    res.status(404).send({ error: 'User not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

const url = "http://localhost:3000/users";

const user4: User = {
  login: "Steve",
  password: "pass112233",
  age: 30,
  isDeleted: false,
};

const user5: User = {
  login: "Dave",
  password: "password123",
  age: 33,
  isDeleted: false,
};

axios
  .post(url, user4)
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });

axios
  .post(url, user5)
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });

setTimeout(() => {
  console.log(users);
  console.log(autoSuggestUsers("D", 2));
}, 1000);
