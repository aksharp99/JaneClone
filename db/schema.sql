CREATE TABLE users
(
id SERIAL PRIMARY KEY
)

CREATE TABLE orders
(
id SERIAL PRIMARY KEY,
userid INTEGER references users(id),
completed BOOLEAN
);

CREATE TABLE products
(
id SERIAL PRIMARY KEY,
Description VARCHAR(250)
)

CREATE TABLE products_in_order
(
id SERIAL PRIMARY KEY,
ordered INTEGER references orders(id),
productid INTEGER references products(id),
quantity FLOAT
)
