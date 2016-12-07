INSERT INTO products_in_order(orderid, productid, price)
VALUES ($1,$2,$3)
RETURNING *;
