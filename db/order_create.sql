INSERT INTO orders(userid, completed)
VALUES ($1, $2)
RETURNING *;
