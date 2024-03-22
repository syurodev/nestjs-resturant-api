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


  CREATE PROCEDURE phamtuanvu.sp_g_restaurant_detail()
  BEGIN
	SELECT 		r.id,
				r.name,
				rb.id as restaurant_brand,
				rb.name as restaurant_brand_name,
				b.id as branche_id,
				b.name as branche_name,
				a.id as area_id,
				a.name as area_name,
				tb.id as table_id,
				tb.name as table_name
	FROM 		restaurants r
	LEFT JOIN 	restaurant_brands rb ON rb.restaurant_id = r.id
	LEFT JOIN 	branches b ON b.restaurant_id = r.id AND b.restaurant_brand_id = rb.id
	LEFT JOIN	areas a ON a.restaurant_id = r.id AND a.restaurant_brand_id = rb.id AND a.branch_id = b.id
	LEFT JOIN	tables tb ON tb.restaurant_id = r.id AND tb.restaurant_brand_id = rb.id AND tb.area_id = a.id;
  END
