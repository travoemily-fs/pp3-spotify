require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('sequelize');

const PORT = process.env.PORT || 3001;
const SECRET = process.env.JWT_SECRET;

// temp for connection check
sequelize.authenticate()
.then(() => console.log("Successfully connected to database"))
.catch((err) => console.error("Unable to establish connection to database", err));

app.get('/', (req, res) => {
    res.send(`Congrats! The server is up and running on port ${PORT}.`);
});

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});