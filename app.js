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

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
  });

app.get("/users", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      "SELECT id, username, password FROM users"
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Se rompió el servidor" });
  } finally {
    if (conn) conn.release();
  }
});

app.get("/users/:id", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      "SELECT id, username, password FROM users WHERE Id=?",
      [req.params.id]
    );

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Se rompió el servidor" });
  } finally {
    if (conn) conn.release();
  }
});

app.post("/users", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const response = await conn.query(
      `INSERT INTO users(username, password) VALUES (?, ?)`,
      [req.body.username, req.body.password]
    );

    res.json({ Id: parseInt(response.insertId), ...req.body });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Se rompió el servidor" });
  } finally {
    if (conn) conn.release();
  }
});

app.put("/users/:id", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const response = await conn.query(
      `UPDATE users SET username=?, password=? WHERE id=?`,
      [req.body.username, req.body.password, req.params.id]
    );

    res.json({ Id: req.params.id, ...req.body });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Se rompió el servidor" });
  } finally {
    if (conn) conn.release();
  }
});

app.delete("/users/:id", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query("DELETE FROM users WHERE id=?", [req.params.id]);
    res.json({ message: "Elemento eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Se rompió el servidor" });
  } finally {
    if (conn) conn.release();
  }
});

app.post("/login", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      "SELECT id, username, password FROM users WHERE username=? AND password=?",
      [req.body.username, req.body.password]
    );

    if (rows.length > 0) {
      res.json({ success: true, message: "Inicio de sesión exitoso" });
    } else {
      res.status(401).json({ success: false, message: "Credenciales incorrectas" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Se rompió el servidor" });
  } finally {
    if (conn) conn.release();
  }
});

app.use(express.static(path.join(__dirname)));

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
