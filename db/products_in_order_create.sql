INSERT INTO products_in_order(orderid,productid,quantity)
VALUES ($1, $2, $3)
RETURNING *;
