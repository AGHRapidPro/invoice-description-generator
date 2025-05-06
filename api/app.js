const express = require('express')
const cors = require('cors')
const fs = require('fs');
const path = require('path');
const app = express()
const port = 3000
const bodyParser = require('body-parser');

const SETTINGS_PATH = path.join(__dirname, 'settings.json');

app.use(cors());
app.use(bodyParser.json());

const readUsers = () => {
  const rawData = fs.readFileSync(SETTINGS_PATH);
  return JSON.parse(rawData).users;
};

const writeUsers = (users) => {
  const currentData = JSON.parse(fs.readFileSync(SETTINGS_PATH));
  currentData.users = users;
  fs.writeFileSync(SETTINGS_PATH, JSON.stringify(currentData, null, 2));
};

app.get('/api/users', (req, res) => {
  try {
    const users = readUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read users data' });
  }
});

app.get('/api/users/:id', (req, res) => {
  try {
    const users = readUsers();
    const user = users.find(u => u.id === parseInt(req.params.id));
    user ? res.json(user) : res.status(404).json({ error: 'User not found' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/users', (req, res) => {
  try {
    const users = readUsers();
    const newUser = {
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      ...req.body
    };

    // Simple validation
    if (!newUser.name || !newUser.index) {
      return res.status(400).json({ error: 'Name and index are required' });
    }

    users.push(newUser);
    writeUsers(users);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add user' });
  }
});

app.put('/api/users/:id', (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const users = readUsers();
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updatedUser = {
      ...users[userIndex],
      ...req.body,
      id: userId
    };

    if (!updatedUser.name || !updatedUser.index) {
      return res.status(400).json({ error: 'Name and index are required' });
    }

    users[userIndex] = updatedUser;
    writeUsers(users);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

app.delete('/api/users/:id', (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    let users = readUsers();
    const initialLength = users.length;

    users = users.filter(u => u.id !== userId);

    if (users.length === initialLength) {
      return res.status(404).json({ error: 'User not found' });
    }

    writeUsers(users);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
