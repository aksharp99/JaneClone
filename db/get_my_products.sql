SELECT *
FROM products_in_order
JOIN products
ON products_in_order.productid = products.id
WHERE products_in_order.orderid = $1
