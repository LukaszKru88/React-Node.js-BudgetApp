require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));

const Users = require('./routes/Users');
const Balance = require('./routes/Balance');
const Income = require('./routes/Income');
const Expence = require('./routes/Expence');
const Settings = require('./routes/Settings');

app.use('/users', Users);
app.use('/balance', Balance);
app.use('/income', Income);
app.use('/expence', Expence);
app.use('/settings', Settings);

app.listen(port, () => console.log(`Listening on port ${port}`));
