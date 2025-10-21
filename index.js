// index.js
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// enable CORS so the API is remotely testable by FCC
app.use(cors({ optionsSuccessStatus: 200 }));

// serve static files (if you keep views and public folders)
app.use(express.static('public'));

// example index page (optional)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// test endpoint
app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'hello API' });
});

// timestamp endpoint
app.get('/api/:date?', (req, res) => {
  const { date } = req.params;

  // If no date param, return current time
  if (!date) {
    const now = new Date();
    return res.json({ unix: now.getTime(), utc: now.toUTCString() });
  }

  // If date consists entirely of digits, treat it as milliseconds epoch
  // (This handles values like "1451001600000")
  const digitsOnly = /^\d+$/;

  let parsedDate;
  if (digitsOnly.test(date)) {
    // Convert to number first (milliseconds)
    parsedDate = new Date(Number(date));
  } else {
    // Otherwise treat as date string
    parsedDate = new Date(date);
  }

  if (parsedDate.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  return res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString()
  });
});

// listen on the port from environment or 3000
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});

