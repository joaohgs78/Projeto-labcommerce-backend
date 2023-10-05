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

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer_id TEXT NOT NULL,
    total_price REAL NOT NULL,
    product_id TEXT, -- Adicionando a coluna product_id
    product_description TEXT,
    created_at DATETIME DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime')),
    FOREIGN KEY (buyer_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE
);



DROP TABLE purchases;




-- Inserindo pedidos com produtos associados
INSERT INTO purchases (id, buyer_id, total_price, product_id, product_description)
VALUES 
('p001', '001', 75.50, 'p1', 'Descrição produto 1'),  
('p002', '002', 100.25, 'p2', 'Descrição produto 2'); 


INSERT INTO purchases (id, buyer_id, total_price, product_id, product_description)
VALUES  ('p003', '003', 500, 'p3', 'Descrição produto 3'); 

-- Selecionando todos os pedidosc
SELECT * FROM purchases;
 
 -- Atualizando o preço total do pedido com ID 'p001'
UPDATE purchases
SET total_price = 85.75
WHERE id = 'p001';

-- Atualizando o preço total do pedido com ID 'p001'
UPDATE purchases
SET total_price = 299.99
WHERE id = 'p002';


SELECT
    p.id AS id_da_compra,
    u.id AS id_de_quem_fez_a_compra,
    u.name AS nome_de_quem_fez_a_compra,
    u.email AS email_de_quem_fez_a_compra,
    p.total_price AS preco_total_da_compra,
    p.created_at AS data_da_compra
FROM
    purchases AS p
JOIN
    users AS u ON p.buyer_id = u.id
WHERE
    p.id = 'p001';


CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE
);


DROP TABLE purchases_products

INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES 
('p001', 'p1', 3),
('p002', 'p2', 6),
('p003', 'p3', 9);

SELECT * FROM purchases_products AS purpro
INNER JOIN purchases AS p ON purpro.purchase_id = p.id
INNER JOIN products AS pr ON purpro.product_id = pr.id;