// Professional Multi-Stack Server for Enterprise Space Data Routing
const express = require('express');
const mysql = require('mysql2');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); 

// ---- DATABASE CONNECTIONS ----

// A) MySQL Connector Config
const mysqlDb = mysql.createConnection({
    host: 'localhost', user: 'root', password: '', database: 'mars_spaceport'
});

// B) MongoDB Mongoose Config (Dual-Database Pipeline setup)
// mongoose.connect('mongodb://localhost:27017/mars_analytics')
// .then(() => console.log('MongoDB Space Analytics Connected...'))
// .catch(err => console.log('MongoDB local instance offline.'));


// ---- API ENDPOINT ROUTING ----
app.post('/api/manifest/register', (req, res) => {
    const { surname, agencyId, trajectory, price } = req.body;
    
    // SQL Ingestion Protocol
    const sqlQuery = "INSERT INTO passenger_manifest (surname, agency_id, trajectory, total_price) VALUES (?, ?, ?, ?)";
    
    mysqlDb.query(sqlQuery, [surname, agencyId, trajectory, price], (err, result) => {
        if(err) {
            return res.status(500).json({ error: "Database registration failure protocols executed." });
        }
        res.status(200).json({ message: "Flight manifest stacked successfully!", manifestId: result.insertId });
    });
});

app.listen(5000, () => console.log('Quantum Space Server active on core cluster port: 5000'));
