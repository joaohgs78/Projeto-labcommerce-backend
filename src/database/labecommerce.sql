-- Active: 1695686980545@@127.0.0.1@3306

PRAGMA foreign_keys = ON; 
PRAGMA date_class = 'datetime';

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime'))
);


INSERT INTO users (id, name, email, password) VALUES ('jl001', 'João Lucas', 'joao@teste.com','senha1234');
INSERT INTO users (id, name, email, password) 
VALUES ('jl002', 'Lucas', 'lucas@teste.com','admin1234'),('jl003', 'Danielle', 'dani@teste.com','dani1234');

SELECT * FROM users;


CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

INSERT INTO products (id, name, price, description, image_url) 
VALUES 
    ('p1', 'Produto 1', 70.99, 'Descrição do Produto 1', 'url_imagem_1.jpg'),
    ('p2', 'Produto 2', 59.99, 'Descrição do Produto 2', 'url_imagem_2.jpg'),
    ('p3', 'Produto 3', 299.99, 'Descrição do Produto 3', 'url_imagem_3.jpg'),
    ('p4', 'Produto 4', 1099.99, 'Descrição do Produto 4', 'url_imagem_4.jpg'),
    ('p5', 'Produto 5', 99.99, 'Descrição do Produto 5', 'url_imagem_5.jpg');

    SELECT * FROM products

