const express = require('express')
const cors = require('cors')
const fs = require('fs');
const path = require('path');
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const {writeFileSync} = require("fs");

const SETTINGS_PATH = path.join(__dirname, 'data/settings.json');

app.use(cors());
app.use(bodyParser.json());

const readUsers = () => {
  const rawData = fs.readFileSync(SETTINGS_PATH);
  return JSON.parse(rawData).users;
};

const readGrants = () => {
  const rawData = fs.readFileSync(SETTINGS_PATH);
  return JSON.parse(rawData).grants;
};

const writeUsers = (users) => {
  const currentData = JSON.parse(fs.readFileSync(SETTINGS_PATH));
  currentData.users = users;
  fs.writeFileSync(SETTINGS_PATH, JSON.stringify(currentData, null, 2));
};

const writeGrants = (grants) => {
  const currentData = JSON.parse(fs.readFileSync(SETTINGS_PATH));
  currentData.grants = grants;
  fs.writeFileSync(SETTINGS_PATH, JSON.stringify(currentData, null, 2));
};

// GET - get all users
app.get('/api/users', (req, res) => {
  try {
    const users = readUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read users data' });
  }
});

// GET - get single user
app.get('/api/users/:id', (req, res) => {
  try {
    const users = readUsers();
    const user = users.find(u => u.id === parseInt(req.params.id));
    user ? res.json(user) : res.status(404).json({ error: 'User not found' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST - Add new user
app.post('/api/users', (req, res) => {
  try {
    const users = readUsers();
    const newUser = {
      ...req.body,
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
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

// PUT - Update user
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

// DELETE - delete user
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

// GET - get all grants
app.get('/api/grants', (req, res) => {
  try {
    const grants = readGrants();
    res.json(grants);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read users data' });
  }
});

// GET - get single grant
app.get('/api/grants/:id', (req, res) => {
  try {
    const grants = readUsers();
    const grant = grants.find(u => u.id === parseInt(req.params.id));
    grant ? res.json(grant) : res.status(404).json({ error: 'Grant not found' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST - Add new grant
app.post('/api/grants', (req, res) => {
  try {
    const grants = readGrants();
    const newGrant = {
      ...req.body,
      id: grants.length > 0 ? Math.max(...grants.map(u => u.id)) + 1 : 1,
    };

    // Simple validation
    if (!newGrant.alias || !newGrant.code) {
      return res.status(400).json({ error: 'Alias and code are required' });
    }

    grants.push(newGrant);
    writeGrants(grants);
    res.status(201).json(newGrant);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add grant' });
  }
});

// PUT - Update grant
app.put('/api/grants/:id', (req, res) => {
  try {
    const grantId = parseInt(req.params.id);
    const grants = readGrants();
    const grantIndex = grants.findIndex(u => u.id === grantId);

    if (grantIndex === -1) {
      return res.status(404).json({ error: 'Grant not found' });
    }

    const updatedGrant = {
      ...grants[grantIndex],
      ...req.body,
      id: grantId
    };

    if (!updatedGrant.alias || !updatedGrant.code) {
      return res.status(400).json({ error: 'Alias and code are required' });
    }

    grants[grantIndex] = updatedGrant;
    writeGrants(grants);
    res.json(updatedGrant);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update grant' });
  }
});

app.delete('/api/grants/:id', (req, res) => {
  try {
    const grantId = parseInt(req.params.id);
    let grants = readGrants();
    const initialLength = grants.length;

    grants = grants.filter(u => u.id !== grantId);

    if (grants.length === initialLength) {
      return res.status(404).json({ error: 'Grant not found' });
    }

    writeGrants(grants);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete grant' });
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
