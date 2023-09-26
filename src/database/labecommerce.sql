PRAGMA foreign_keys = ON; 
PRAGMA date_class = 'datetime';

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime'))
);

SELECT * FROM users;

INSERT INTO users (id, name, email, password)
VALUES
  ('001', 'Fulano', 'fulano@email.com', '123456'),
  ('002', 'Ciclano', 'joaolucas@email.com', '654321'),
  ('003', 'Betrano', 'beltrano@email.com', '121212');

DROP TABLE users

CREATE TABLE products (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL
);

SELECT * FROM products;

INSERT INTO products (id, name, price, description, image_url) 
VALUES 
    ('p1', 'Produto 1', 70.99, 'Descrição do Produto 1', 'url_imagem_1.jpg'),
    ('p2', 'Produto 2', 59.99, 'Descrição do Produto 2', 'url_imagem_2.jpg'),
    ('p3', 'Produto 3', 299.99, 'Descrição do Produto 3', 'url_imagem_3.jpg'),
    ('p4', 'Produto 4', 1099.99, 'Descrição do Produto 4', 'url_imagem_4.jpg'),
    ('p5', 'Produto 5', 99.99, 'Descrição do Produto 5', 'url_imagem_5.jpg');

    DROP TABLE products