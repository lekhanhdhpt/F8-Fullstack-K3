-- 1. Xem danh sách đơn hàng

SELECT customers_info.id, customers_info.email, customers_info.phone, products_info.quantity, products_info.quantity * products.price AS total_money
FROM custommers_info
JOIN order ON custommers_info.id = order.customers_id
JOIN products_info ON order.id = products_info.order_id
JOIN products ON products_info.products_id = products.id