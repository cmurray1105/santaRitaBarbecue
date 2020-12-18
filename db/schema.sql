DROP DATABASE IF EXISTS barbecue;

CREATE DATABASE barbecue;

USE barbecue;

CREATE TABLE product (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_name VARCHAR(255),
  category VARCHAR(255),
  quantity INT,
  image_url VARCHAR(255) NOT NULL,
  price FLOAT NOT NULL
);

CREATE TABLE cart (
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(255) NOT NULL,
street_address VARCHAR(255),
city VARCHAR(255),
ordered_at DATETIME NOT NULL,
scheduled_delivery DATETIME NOT NULL,
neighborhood VARCHAR(255)
);

CREATE TABLE cart_item (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  cart_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 0,

INDEX `idx_cart_item_product` (product_id ASC),
  CONSTRAINT `fk_cart_item_product`
    FOREIGN KEY (product_id)
    REFERENCES product(id)
    );

ALTER TABLE cart_item
ADD INDEX `idx_cart_item_cart` (cart_id ASC);

ALTER TABLE cart_item
ADD CONSTRAINT `fk_cart_item_cart`
  FOREIGN KEY (cart_id)
  REFERENCES cart (id);


INSERT INTO product (product_name, category, quantity, image_url, price) VALUES ('Brisket', 'Meats', 15, 'https://bbqbucket2020.s3.us-east-2.amazonaws.com/brisket.jpg', 8.99);

INSERT INTO product (product_name, category, quantity, image_url, price) VALUES ('Sausage', 'Meats', 12, 'https://bbqbucket2020.s3.us-east-2.amazonaws.com/sausage.jpg', 6.50);

INSERT INTO product (product_name, category, quantity, image_url, price) VALUES ('Ribs', 'Meats', 10, 'https://bbqbucket2020.s3.us-east-2.amazonaws.com/ribs.jpg', 19.50);

INSERT INTO product (product_name, category, quantity, image_url, price) VALUES ('Mac-n-Cheese', 'Sides', 29, 'https://bbqbucket2020.s3.us-east-2.amazonaws.com/mac-n-cheese.jpg', 5.50);

INSERT INTO product (product_name, category, quantity, image_url, price) VALUES ('Potato Salad', 'Sides', 35, 'https://bbqbucket2020.s3.us-east-2.amazonaws.com/potato+salad.jpeg', 5.50);

INSERT INTO cart (street_address, name, city, ordered_at, scheduled_delivery, neighborhood) VALUES ('349 Vista Portola Loop', 'Christopher Murray', 'Liberty Hill', '2020-12-23 12:00:00', '2020-12-30 12:00:00', 'Santa Rita Ranch South');

INSERT INTO cart (street_address, name, city, ordered_at, scheduled_delivery, neighborhood) VALUES ('349 Vista Portola Loop', 'Nicole Fabiano', 'Liberty Hill', '2020-12-23 12:00:00', '2020-12-30 12:00:00', 'Santa Rita Ranch South');

INSERT INTO cart_item (product_id, cart_id, quantity) VALUES (1, 1, 2);

INSERT INTO cart_item (product_id, cart_id, quantity) VALUES (2, 1, 1);

INSERT INTO cart_item (product_id, cart_id, quantity) VALUES (5, 1, 1);

INSERT INTO cart_item (product_id, cart_id, quantity) VALUES (5, 2, 1);

INSERT INTO cart_item (product_id, cart_id, quantity) VALUES (1, 2, 2);

SELECT cart.id, cart_item.quantity, product.product_name, product.price, cart.scheduled_delivery, cart.neighborhood, cart.name, cart.street_address FROM ((cart_item INNER JOIN product ON cart_item.product_id = product.id) INNER JOIN cart on cart_item.cart_id = cart.id);
