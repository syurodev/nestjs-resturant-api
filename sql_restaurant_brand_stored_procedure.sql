-- sp_g_restaurant_brand
CREATE DEFINER=`phamtuanvu`@`%` PROCEDURE `phamtuanvu`.`sp_g_restaurant_brand`(
	IN `employeeId` INT(11),
	IN `restaurantBrandId` INT(11),
	OUT `status_code` TINYINT(1),
	OUT `message_error` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		SET `status_code` = 1;
		GET DIAGNOSTICS CONDITION 1 `message_error` = MESSAGE_TEXT;
		SELECT `status_code`, `message_error`;
	END;

	SET `status_code` = 0;
	SET `message_error` = 'Success';

	SELECT 	rb.id,
			rb.name,
			rb.status,
			rb.created_at
	FROM 	restaurant_brands rb
	WHERE 	rb.employee_id = `employeeId`
			AND rb.id = `restaurantBrandId`;
END

-- sp_g_restaurant_brands
CREATE DEFINER=`phamtuanvu`@`%` PROCEDURE `phamtuanvu`.`sp_g_restaurant_brands`(
	IN `employeeId` INT(11),
	OUT `status_code` TINYINT(1),
	OUT `message_error` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		SET `status_code` = 1;
		GET DIAGNOSTICS CONDITION 1 `message_error` = MESSAGE_TEXT;
		SELECT `status_code`, `message_error`;
	END;

	SET `status_code` = 0;
	SET `message_error` = 'Success';

	SELECT 	rb.id,
			rb.name,
			rb.status,
			rb.created_at
	FROM 	restaurant_brands rb
	WHERE 	rb.employee_id = `employeeId`;
END

-- sp_u_restaurant_brand_create
CREATE DEFINER=`phamtuanvu`@`%` PROCEDURE `phamtuanvu`.`sp_u_restaurant_brand_create`(
	IN `employeeId` INT(11),
	IN `restaurantId` INT(11),
	IN `_name` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci,
	OUT `status_code` TINYINT(1),
	OUT `message_error` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci
)
store_procedure:BEGIN
	DECLARE `existingRestaurantBrand` TINYINT(1) DEFAULT 0;
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		SET `status_code` = 1;
		GET DIAGNOSTICS CONDITION 1 `message_error` = MESSAGE_TEXT;
		SELECT `status_code`, `message_error`;
	END;

	SET `status_code` = 0;
	SET `message_error` = 'Success';

	SELECT 	COUNT(*)
	INTO 	`existingRestaurantBrand`
	FROM 	restaurant_brands rb
	WHERE 	rb.name = `_name`
		AND	rb.restaurant_id = `restaurantId`;

	IF `existingRestaurantBrand` > 0 THEN
		SET `status_code` = 2;
		SET `message_error` = 'Tên thương hiệu đã tồn tại';
		LEAVE store_procedure;
	ELSE
		INSERT INTO restaurant_brands (employee_id, restaurant_id, name)
		VALUES (`employeeId`, `restaurantId`, `_name`);
	END IF;

	SELECT 	rb.id,
			rb.name,
			rb.status,
			rb.created_at
	FROM 	restaurant_brands rb
	WHERE 	rb.id = LAST_INSERT_ID();
END

-- sp_u_restaurant_brands_create
CREATE DEFINER=`phamtuanvu`@`%` PROCEDURE `phamtuanvu`.`sp_u_restaurant_brands_create`(
	IN `employeeId` INT(11),
	IN `restaurantBrandsData` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci,
	OUT `status_code` TINYINT(1),
	OUT `message_error` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci
)
store_procedure:BEGIN
	DECLARE `index` INT(3) DEFAULT 0;
    DECLARE `countNumber` INT(3) DEFAULT 0;
   	DECLARE `isExitRestaurantBrand` TINYINT(1) DEFAULT 0;
   	DECLARE `brandName` VARCHAR(255);
	DECLARE `brandExists` TINYINT(1) DEFAULT 0;
	DECLARE `restaurantBrandExistsLength` TINYINT(1) DEFAULT 0;

	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		SET `status_code` = 1;
		GET DIAGNOSTICS CONDITION 1 `message_error` = MESSAGE_TEXT;
		SELECT `status_code`, `message_error`;
	END;

	SET `status_code` = 0;
	SET `message_error` = 'Success';

	DROP TEMPORARY TABLE IF EXISTS tbl_restaurant_brands;
	CREATE TEMPORARY TABLE tbl_restaurant_brands(
		name VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci,
		employee_id INT(11),
		restaurant_id INT(11)
	);

	DROP TEMPORARY TABLE IF EXISTS tbl_exit_restaurant_brands;
	CREATE TEMPORARY TABLE tbl_exit_restaurant_brands(
		idx TINYINT(3),
		message VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci
	);

	SET `countNumber` = JSON_LENGTH(`restaurantBrandsData`,'$');
	WHILE `index` < `countNumber` DO

	    SET `brandName` = JSON_UNQUOTE(JSON_EXTRACT(`restaurantBrandsData`, CONCAT('$[', `index`, '].name')));

	    SELECT COUNT(*) INTO `brandExists` FROM restaurant_brands WHERE name = brandName;

	    IF `brandExists` > 0 THEN
	        INSERT INTO tbl_exit_restaurant_brands (idx, message)
	        VALUES (`index`, "Tên thương hiệu đã tồn tại");
	    ELSE
	        INSERT INTO tbl_restaurant_brands (
	            name,
	            employee_id,
	            restaurant_id
	        )
	        VALUES (
	            `brandName`,
	            `employeeId`,
	            JSON_UNQUOTE(JSON_EXTRACT(`restaurantBrandsData`, CONCAT('$[', `index`, '].restaurant_id')))
	        );
	    END IF;

	    SET `index` = `index` + 1;
	END WHILE;

	SELECT 	COUNT(*)
	INTO 	`isExitRestaurantBrand`
	FROM 	tbl_exit_restaurant_brands;

	SET `isExitRestaurantBrand` = (
								    CASE
								        WHEN `isExitRestaurantBrand` > 0
								        THEN 1
								        ELSE (
								            SELECT COUNT(*)
								            FROM tbl_restaurant_brands rb
								            GROUP BY rb.name
								            HAVING COUNT(*) > 1
								            LIMIT 1
								         )
								    END
								  );

	IF `isExitRestaurantBrand` > 0 THEN
		SELECT COUNT(*) INTO `restaurantBrandExistsLength` FROM tbl_exit_restaurant_brands;

		SET `status_code` = 2;

		IF `restaurantBrandExistsLength` > 0 THEN
			SELECT CONCAT('[', GROUP_CONCAT(CONCAT('{"index":', idx, ',"message":"', message, '"}')), ']')
		    INTO `message_error`
		    FROM tbl_exit_restaurant_brands;
		ELSE
			SET `message_error` = "Tên thương hiệu đã nhập bị trùng";
		END IF;
		LEAVE store_procedure;
	END IF;

	INSERT INTO restaurant_brands (name, employee_id, restaurant_id)
				SELECT 			   rb.name,
								   rb.employee_id,
								   rb.restaurant_id
				FROM 			   tbl_restaurant_brands rb;

	SELECT 	rb.id,
            rb.name,
            rb.status,
            rb.created_at
    FROM 	restaurant_brands rb
    WHERE	rb.name IN(SELECT name FROM tbl_restaurant_brands)
   			AND rb.restaurant_id IN(SELECT restaurant_id FROM tbl_restaurant_brands);

	DROP TEMPORARY TABLE IF EXISTS tbl_restaurant_brands;
	DROP TEMPORARY TABLE IF EXISTS tbl_exit_restaurant_brands;
END
