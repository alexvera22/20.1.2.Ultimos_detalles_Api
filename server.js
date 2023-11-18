const express = require('express');
const mariadb = require('mariadb');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
const fs = require('fs');

const pool = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "usuarios",
    connectionLimit: 5,
});

const app = express();
const port = 3000;

app.use(bodyParser.json());

const secretKey = 'ClaveSecreta'; // Cambia esto en un entorno de producción

app.get('/users/:id', async (req, res) => {
    let conn;
    try {
  
      conn = await pool.getConnection();
      const rows = await conn.query(
        "SELECT id , users FROM users WHERE id=?", [req.params.id]
        );
        res.json(rows);
    } catch (error){
        console.log(error);
    };
})


app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if(username === "admin" && password === "contraseña"){
            // Generar token y devolverlo al cliente
            const token = jwt.sign({ username }, secretKey);
            res.status(20).json({ token });
        } else {
            res.status(401).json({ message: 'Usuario y/o contraseñas incorrectos.'});
        }
        });

app.use(express.static('public'));
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});