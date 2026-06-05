SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `payments`;
DROP TABLE IF EXISTS `order_items`;
DROP TABLE IF EXISTS `orders`;
DROP TABLE IF EXISTS `cart_items`;
DROP TABLE IF EXISTS `shopping_sessions`;
DROP TABLE IF EXISTS `product_variants`;
DROP TABLE IF EXISTS `inventory`;
DROP TABLE IF EXISTS `stock_in`;
DROP TABLE IF EXISTS `stock_out`;
DROP TABLE IF EXISTS `products`;
DROP TABLE IF EXISTS `addresses`;
DROP TABLE IF EXISTS `brands`;
DROP TABLE IF EXISTS `colors`;
DROP TABLE IF EXISTS `skus`;
DROP TABLE IF EXISTS `shoe_sizes`;
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('admin', 'user') NOT NULL DEFAULT 'user',
  `name` VARCHAR(255) NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `brands` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `description` TEXT NULL,
  `logo_url` VARCHAR(255) NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `brands_name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `colors` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `colors_name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `skus` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `skus_code_unique` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `shoe_sizes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `size_value` DECIMAL(4,1) NOT NULL,
  `size_system` VARCHAR(10) NOT NULL,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `shoe_sizes_value_system_unique` (`size_value`, `size_system`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `brand_id` INT NOT NULL,
  `description` TEXT NULL,
  `base_price` DECIMAL(10,2) NOT NULL,
  `stock` INT NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `products_brand_id_idx` (`brand_id`),
  CONSTRAINT `products_brand_id_fk` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `product_variants` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `size_id` INT NOT NULL,
  `color_id` INT NOT NULL,
  `sku_id` INT NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `stock_quantity` INT NOT NULL,
  `image_url` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  KEY `product_variants_product_id_idx` (`product_id`),
  KEY `product_variants_size_id_idx` (`size_id`),
  KEY `product_variants_color_id_idx` (`color_id`),
  KEY `product_variants_sku_id_idx` (`sku_id`),
  CONSTRAINT `product_variants_product_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT `product_variants_size_id_fk` FOREIGN KEY (`size_id`) REFERENCES `shoe_sizes` (`id`) ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT `product_variants_color_id_fk` FOREIGN KEY (`color_id`) REFERENCES `colors` (`id`) ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT `product_variants_sku_id_fk` FOREIGN KEY (`sku_id`) REFERENCES `skus` (`id`) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `addresses` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `street` VARCHAR(255) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `state` VARCHAR(100) NULL,
  `postal_code` VARCHAR(20) NOT NULL,
  `country` VARCHAR(100) NOT NULL,
  `is_default` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `addresses_user_id_idx` (`user_id`),
  CONSTRAINT `addresses_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `shopping_sessions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL,
  `token` VARCHAR(255) NOT NULL,
  `expires_at` DATETIME NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `shopping_sessions_token_unique` (`token`),
  KEY `shopping_sessions_user_id_idx` (`user_id`),
  CONSTRAINT `shopping_sessions_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `cart_items` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `session_id` INT NOT NULL,
  `variant_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `cart_items_session_id_idx` (`session_id`),
  KEY `cart_items_variant_id_idx` (`variant_id`),
  CONSTRAINT `cart_items_session_id_fk` FOREIGN KEY (`session_id`) REFERENCES `shopping_sessions` (`id`) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT `cart_items_variant_id_fk` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `orders` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL,
  `address_id` INT NULL,
  `total_amount` DECIMAL(10,2) NOT NULL,
  `status` ENUM('pending', 'paid', 'shipped', 'delivered', 'cancelled') NOT NULL DEFAULT 'pending',
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `orders_user_id_idx` (`user_id`),
  KEY `orders_address_id_idx` (`address_id`),
  CONSTRAINT `orders_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE ON DELETE SET NULL,
  CONSTRAINT `orders_address_id_fk` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`) ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `order_items` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `order_id` INT NOT NULL,
  `variant_id` INT NULL,
  `quantity` INT NOT NULL,
  `price_at_purchase` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_items_order_id_idx` (`order_id`),
  KEY `order_items_variant_id_idx` (`variant_id`),
  CONSTRAINT `order_items_order_id_fk` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT `order_items_variant_id_fk` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`id`) ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `payments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `order_id` INT NOT NULL,
  `amount` DECIMAL(10,2) NOT NULL,
  `payment_method` VARCHAR(50) NOT NULL,
  `status` ENUM('pending', 'completed', 'failed') NOT NULL DEFAULT 'pending',
  `transaction_id` VARCHAR(100) NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `payments_order_id_unique` (`order_id`),
  CONSTRAINT `payments_order_id_fk` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `inventory` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `quantity` INT NOT NULL DEFAULT 0,
  `location` VARCHAR(100) NULL,
  `last_updated` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `inventory_product_id_idx` (`product_id`),
  CONSTRAINT `inventory_product_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `stock_in` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  `supplier` VARCHAR(255) NULL,
  `date_added` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `stock_in_product_id_idx` (`product_id`),
  CONSTRAINT `stock_in_product_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `stock_out` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  `reason` VARCHAR(255) NULL,
  `date_removed` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `stock_out_product_id_idx` (`product_id`),
  CONSTRAINT `stock_out_product_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `users` (`id`, `email`, `password`, `role`, `name`) VALUES
(1, 'admin@shoe.local', '$2b$10$adminhashplaceholder', 'admin', 'Admin'),
(2, 'user@shoe.local', '$2b$10$userhashplaceholder', 'user', 'Nguyen Van A');

INSERT INTO `brands` (`id`, `name`, `description`, `logo_url`) VALUES
(1, 'Nike', 'Thuong hieu giay the thao', 'https://example.com/logos/nike.png'),
(2, 'Adidas', 'Giay va phu kien the thao', 'https://example.com/logos/adidas.png');

INSERT INTO `colors` (`id`, `name`) VALUES
(1, 'Black'),
(2, 'White'),
(3, 'Red');

INSERT INTO `skus` (`id`, `code`) VALUES
(1, 'SKU-NIKE-001'),
(2, 'SKU-ADIDAS-001');

INSERT INTO `shoe_sizes` (`id`, `size_value`, `size_system`, `description`) VALUES
(1, 38.0, 'EU', 'EU 38'),
(2, 39.0, 'EU', 'EU 39'),
(3, 40.0, 'EU', 'EU 40');

INSERT INTO `products` (`id`, `name`, `brand_id`, `description`, `base_price`, `stock`) VALUES
(1, 'Nike Air Max', 1, 'Giay chay bo', 2500000.00, 100),
(2, 'Adidas Ultraboost', 2, 'Giay the thao cao cap', 3200000.00, 80);

INSERT INTO `product_variants` (`id`, `product_id`, `size_id`, `color_id`, `sku_id`, `price`, `stock_quantity`, `image_url`) VALUES
(1, 1, 1, 1, 1, 2550000.00, 20, 'https://example.com/products/nike-air-max-black-38.png'),
(2, 1, 2, 2, 1, 2550000.00, 15, 'https://example.com/products/nike-air-max-white-39.png'),
(3, 2, 3, 1, 2, 3250000.00, 10, 'https://example.com/products/adidas-ultraboost-black-40.png');

INSERT INTO `addresses` (`id`, `user_id`, `street`, `city`, `state`, `postal_code`, `country`, `is_default`) VALUES
(1, 2, '123 Le Loi', 'Ho Chi Minh', NULL, '700000', 'Vietnam', 1);

INSERT INTO `shopping_sessions` (`id`, `user_id`, `token`, `expires_at`) VALUES
(1, 2, 'session-demo-token-001', NULL);

INSERT INTO `cart_items` (`id`, `session_id`, `variant_id`, `quantity`) VALUES
(1, 1, 1, 2),
(2, 1, 2, 1);

INSERT INTO `orders` (`id`, `user_id`, `address_id`, `total_amount`, `status`) VALUES
(1, 2, 1, 7650000.00, 'paid');

INSERT INTO `order_items` (`id`, `order_id`, `variant_id`, `quantity`, `price_at_purchase`) VALUES
(1, 1, 1, 2, 2550000.00),
(2, 1, 2, 1, 2550000.00);

INSERT INTO `payments` (`id`, `order_id`, `amount`, `payment_method`, `status`, `transaction_id`) VALUES
(1, 1, 7650000.00, 'vnpay', 'completed', 'VNPAY-TRANS-0001');

INSERT INTO `inventory` (`id`, `product_id`, `quantity`, `location`) VALUES
(1, 1, 100, 'Warehouse A'),
(2, 2, 80, 'Warehouse A');

INSERT INTO `stock_in` (`id`, `product_id`, `quantity`, `supplier`) VALUES
(1, 1, 50, 'Supplier Nike VN'),
(2, 2, 40, 'Supplier Adidas VN');

INSERT INTO `stock_out` (`id`, `product_id`, `quantity`, `reason`) VALUES
(1, 1, 5, 'Damaged box');

SET FOREIGN_KEY_CHECKS = 1;