UPDATE orders
SET completed=true
WHERE id = $1
RETURNING *;
