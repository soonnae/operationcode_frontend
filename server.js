const express = require('express');
const path = require('path');

const app = express();

app.enable('trust proxy');

app.use((req, res, next) => {
  const allowedHosts = ['yourdomain.com', 'anothertrusteddomain.com']; // Add your trusted domains here
  const host = req.headers.host;
  if (req.headers['x-forwarded-proto'] !== 'https' && allowedHosts.includes(host)) {
    return res.redirect(`https://${host}${req.url}`);
  }
  return next();
});

app.use(express.static('./build'));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './build', 'index.html'));
});

app.listen(process.env.PORT);
