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
  const { login, password, age } = req.body;

  // Check that all required fields are present in the request body
  if (!login || !password || !age) {
    return res.status(400).send({ error: 'Missing required fields' });
  }

  // Check that the login is valid
  if (!/^[a-zA-Z0-9]+$/.test(login)) {
    return res.status(400).send({ error: 'Invalid login' });
  }

  // Check that the password contains letters and numbers
  if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(password)) {
    return res.status(400).send({ error: 'Password must contain letters and numbers' });
  }

  // Check that the age is between 4 and 130
  if (age < 4 || age > 130) {
    return res.status(400).send({ error: 'Invalid age' });
  }

  // Generate a new ID for the user
  const id = users.length + 1;
  const uuid = uuidv4();

  // Create a new user object
  const user = { id, uuid, login, password, age, isDeleted: false };

  // Add the new user to the users array
  users.push(user);

  // Return the new user object as the response
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

  // Check that all required fields are present in the request body
  if (!login || !password || !age) {
    return res.status(400).send({ error: 'Missing required fields' });
  }

  // Check that the login is valid
  if (!/^[a-zA-Z0-9]+$/.test(login)) {
    return res.status(400).send({ error: 'Invalid login' });
  }

  // Check that the password contains letters and numbers
  if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(password)) {
    return res.status(400).send({ error: 'Password must contain letters and numbers' });
  }

  // Check that the age is between 4 and 130
  if (age < 4 || age > 130) {
    return res.status(400).send({ error: 'Invalid age' });
  }

  // Find the index of the user with the specified ID in the users array
  const index = users.findIndex(u => u.id === parseInt(id));

  if (index !== -1) {
    // Create a new user object with the updated fields
    const user = { id: index, login, password, age, isDeleted };

    // Update the user in the users array
    users[index] = user;

    // Return the updated user object as the response
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
