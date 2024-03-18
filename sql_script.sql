CREATE TABLE
  `employees` (
    `id` int (11) NOT NULL AUTO_INCREMENT,
    `username` varchar(255) DEFAULT '' NOT NULL,
    `full_name` varchar(255) DEFAULT '' NOT NULL,
    `gender` tinyint (1) DEFAULT 0 NOT NULL,
    `birthday` date DEFAULT NULL,
    `phone_number` varchar(255) DEFAULT '' NOT NULL,
    `password` varchar(255) DEFAULT '' NOT NULL,
    `access_token` text DEFAULT '' NOT NULL,
    `status` tinyint (1) DEFAULT 1 NOT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`id`) USING BTREE
  ) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

CREATE TABLE
  `restaurants` (
    `id` int (11) NOT NULL AUTO_INCREMENT,
    `employee_id` int (11) NOT NULL DEFAULT 0,
    `name` varchar(255) DEFAULT '' NOT NULL,
    `status` tinyint (1) DEFAULT 1 NOT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`id`) USING BTREE
  ) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

CREATE TABLE
  `restaurant_brands` (
    `id` int (11) NOT NULL AUTO_INCREMENT,
    `employee_id` int (11) NOT NULL DEFAULT 0,
    `restaurant_id` int (11) NOT NULL DEFAULT 0,
    `name` varchar(255) DEFAULT '' NOT NULL,
    `status` tinyint (1) DEFAULT 1 NOT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`id`) USING BTREE
  ) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

CREATE TABLE
  `branches` (
    `id` int (11) NOT NULL AUTO_INCREMENT,
    `employee_id` int (11) NOT NULL DEFAULT 0,
    `restaurant_id` int (11) NOT NULL DEFAULT 0,
    `restaurant_brand_id` int (11) NOT NULL DEFAULT 0,
    `name` varchar(255) DEFAULT '' NOT NULL,
    `status` tinyint (1) DEFAULT 1 NOT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`id`) USING BTREE
  ) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

CREATE TABLE
  `areas` (
    `id` int (11) NOT NULL AUTO_INCREMENT,
    `employee_id` int (11) NOT NULL DEFAULT 0,
    `restaurant_id` int (11) NOT NULL DEFAULT 0,
    `restaurant_brand_id` int (11) NOT NULL DEFAULT 0,
    `branch_id` int (11) NOT NULL DEFAULT 0,
    `name` varchar(255) DEFAULT '' NOT NULL,
    `status` tinyint (1) DEFAULT 1 NOT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`id`) USING BTREE
  ) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

CREATE TABLE
  `tables` (
    `id` int (11) NOT NULL AUTO_INCREMENT,
    `employee_id` int (11) NOT NULL DEFAULT 0,
    `restaurant_id` int (11) NOT NULL DEFAULT 0,
    `restaurant_brand_id` int (11) NOT NULL DEFAULT 0,
    `area_id` int (11) NOT NULL DEFAULT 0,
    `name` varchar(255) DEFAULT '' NOT NULL,
    `status` tinyint (1) DEFAULT 1 NOT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`id`) USING BTREE
  ) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;