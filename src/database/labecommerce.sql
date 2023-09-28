-- Active: 1695691257107@@127.0.0.1@3306
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

  --Get All Users--
  SELECT * FROM users;

  --Get All Products--
  SELECT * FROM products;

  --Get all Products (funcionalidade 2)--

  SELECT * FROM products WHERE  name='Produto 1'

  --Exercício 2--

  --Create User--

  INSERT INTO users (id, name, email, password)
  VALUES('004', 'Joao', 'joao@teste.com', '7891027')

--Create Product--

INSERT INTO products (id, name, price, description, image_url)
VALUES('p6', 'Produto 6', 200.99, 'Descrição do Produto 6', 'url_imagem_6.jpg')

--Delete User by id--

DELETE FROM users WHERE id='004'

--Delete Product by id--

DELETE FROM products WHERE id='p6'

--Edit Product by id--

UPDATE products SET price=999.99 WHERE id='p4'

--  make the query edit all columns of the item --

UPDATE products
SET 
  name = 'Produto 7',
  price = 699.79,
  description = 'Descrição do Produto 7',
  image_url = 'novaimagemurl.jpg'
WHERE id = 'p5';

