DROP DATABASE IF EXISTS barbecue;

CREATE DATABASE barbecue;

USE barbecue;

  CREATE TABLE categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  category VARCHAR(255) NOT NULL
  );


CREATE TABLE product (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_name VARCHAR(255),
  category VARCHAR(255),
  quantity INT,
  image_url VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL
);

CREATE TABLE orders (
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(255) NOT NULL,
street_address VARCHAR(255),
city VARCHAR(255),
ordered_at DATETIME NOT NULL,
scheduled_delivery DATETIME NOT NULL,
neighborhood VARCHAR(255),
email VARCHAR(255),
phone VARCHAR(255)
);
  

CREATE TABLE order_item (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  order_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 0
  );

-- INDEX `idx_order_item_product` (product_id ASC),
--   CONSTRAINT `fk_order_item_product`
--     FOREIGN KEY (product_id)
--     REFERENCES product(id)
--     );

-- ALTER TABLE order_item
-- ADD INDEX `idx_order_item_orders` (order_id ASC);

-- ALTER TABLE order_item
-- ADD CONSTRAINT `fk_order_item_order`
--   FOREIGN KEY (order_id)
--   REFERENCES orders (id);



INSERT INTO categories (category) VALUES ('Meats');

INSERT INTO categories (category) VALUES ('Sides');

INSERT INTO categories (category) VALUES ('Combos');

INSERT INTO categories (category) VALUES ('Catering');

INSERT INTO product (product_name, category, quantity, image_url, price) VALUES ('Brisket', 'Meats', 15, 'https://bbqbucket2020.s3.us-east-2.amazonaws.com/brisket.jpg', 8.99);

INSERT INTO product (product_name, category, quantity, image_url, price) VALUES ('Sausage', 'Meats', 12, 'https://bbqbucket2020.s3.us-east-2.amazonaws.com/sausage.jpg', 6.50);

INSERT INTO product (product_name, category, quantity, image_url, price) VALUES ('Ribs', 'Meats', 15, 'https://bbqbucket2020.s3.us-east-2.amazonaws.com/ribs.jpg', 25.00);

INSERT INTO product (product_name, category, quantity, image_url, price) VALUES ('Mac-n-Cheese', 'Sides', 29, 'https://bbqbucket2020.s3.us-east-2.amazonaws.com/mac-n-cheese.jpg', 5.50);

INSERT INTO product (product_name, category, quantity, image_url, price) VALUES ('Potato Salad', 'Sides', 35, 'https://bbqbucket2020.s3.us-east-2.amazonaws.com/potato+salad.jpeg', 5.50);

INSERT INTO product (product_name, category, quantity, image_url, price) VALUES ('Pirate Platter', 'Combos', 12, 'https://bbqbucket2020.s3.us-east-2.amazonaws.com/sausage.jpg', 40.00);

INSERT INTO product (product_name, category, quantity, image_url, price) VALUES ('Whole Pork Butt', 'Catering', 8, 'https:///bbqbucket2020.s3.us-east-2.amazonaws.com/sausage.jpg', 50.00);

INSERT INTO product (product_name, category, quantity, image_url, price) VALUES ('Whole USDA Prime Brisket', 'Catering', 8, 'https:///bbqbucket2020.s3.us-east-2.amazonaws.com/sausage.jpg', 100.00);


INSERT INTO orders (street_address, name, city, ordered_at, scheduled_delivery, neighborhood, email, phone) VALUES ('349 Vista Portola Loop', 'Christopher Murray', 'Liberty Hill', '2020-12-23 12:00:00', '2020-12-30 12:00:00', 'Santa Rita Ranch South', 'cmurray1105@gmail.com', '6176887762');

INSERT INTO orders (street_address, name, city, ordered_at, scheduled_delivery, neighborhood, email, phone, status) VALUES ('349 Vista Portola Loop', 'Nicole Fabiano', 'Liberty Hill', '2020-12-23 12:00:00', '2020-12-30 12:00:00', 'Santa Rita Ranch South', 'cmurray1105@gmail.com', '6176887762');

INSERT INTO order_item (product_id, order_id, quantity) VALUES (1, 1, 2);

INSERT INTO order_item (product_id, order_id, quantity) VALUES (2, 1, 1);

INSERT INTO order_item (product_id, order_id, quantity) VALUES (5, 1, 1);

INSERT INTO order_item (product_id, order_id, quantity) VALUES (5, 2, 1);

INSERT INTO order_item (product_id, order_id, quantity) VALUES (1, 2, 2);

SELECT orders.id, order_item.quantity, product.product_name, product.price, orders.scheduled_delivery, orders.neighborhood, orders.name, orders.street_address, orders.phone, orders.email,  FROM ((order_item INNER JOIN product ON order_item.product_id = product.id) INNER JOIN orders on order_item.order_id = orders.id);

SELECT orders.id, order_item.quantity, product.product_name, product.price, orders.scheduled_delivery, orders.neighborhood, orders.name, orders.street_address, orders.phone, orders.email,  FROM ((order_item INNER JOIN product ON order_item.product_id = product.id) INNER JOIN orders on order_item.order_id = orders.id);