INSERT INTO products_in_order(quantity,price,total)
VALUES ($1,$2,$3)
RETURNING *;
