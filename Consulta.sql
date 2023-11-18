INSERT INTO users (username, password) VALUES ('username', 'password');

SELECT id , username, password FROM users

SELECT id, username, password FROM users WHERE Id=?

INSERT INTO users(username, password) VALUES (?, ?)

UPDATE users SET username=?, password=? WHERE id=?

DELETE FROM users WHERE id=?