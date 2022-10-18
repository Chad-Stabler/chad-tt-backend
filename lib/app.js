const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');


app.use(cors({
  origin: [
    'http://localhost:7891',
    'https://rococo-zuccutto-16e349.netlify.app'
  ],
  credentials: true,
})
);

// Built in middleware
app.use(express.json());
app.use(cookieParser());

// App routes
app.use('/api/v1/users', require('./controllers/user'));
app.use('/api/v1/clips', require('./controllers/clips'));


//NEED TO ADD CORS to TEST


// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
