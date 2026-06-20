const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
const config = require('./github_oauth_config.json');

app.get('/login', (req, res) => {
  const url = `https://github.com/login/oauth/authorize?client_id=${config.client_id}&redirect_uri=${config.redirect_uri}`;
  res.redirect(url);
});

app.get('/callback', (req, res) => {
  const code = req.query.code;
  const tokenUrl = 'https://github.com/login/oauth/access_token';
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  const data = `client_id=${config.client_id}&client_secret=${config.client_secret}&code=${code}&redirect_uri=${config.redirect_uri}`;
  axios.post(tokenUrl, data, { headers })
    .then((response) => {
      const token = response.data.access_token;
      res.send(`Authenticated with token: ${token}`);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error authenticating with GitHub');
    });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});