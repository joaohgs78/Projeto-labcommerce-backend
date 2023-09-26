-- Active: 1695686980545@@127.0.0.1@3306

PRAGMA foreign_keys = ON; 
PRAGMA date_class = 'datetime';

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE users;

INSERT INTO users (id, name, email, password) VALUES ('jl001', 'João Lucas', 'joao@teste.com','senha1234');

SELECT * FROM users;