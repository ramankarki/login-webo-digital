const axios = require('axios');

const test = async () => {
  const users = await axios.get('https://jsonplaceholder.typicode.com/users');
  console.log(users);
};

test();
