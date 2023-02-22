import axios from "axios";
import User from "./types/User";

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