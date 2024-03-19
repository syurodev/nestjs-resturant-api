-- sp_g_restaurant
CREATE DEFINER=`phamtuanvu`@`%` PROCEDURE `phamtuanvu`.`sp_g_restaurant`(
	IN `restaunantId` INT(11),
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

	SELECT 	r.id,
			r.name,
			r.status,
			r.created_at
	FROM 	restaurants r
	WHERE 	r.id = `restaunantId`
		AND r.employee_id = `employeeId`;
END

-- sp_g_restaurants
CREATE DEFINER=`phamtuanvu`@`%` PROCEDURE `phamtuanvu`.`sp_g_restaurants`(
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

	SELECT 	r.id,
			r.name,
			r.status,
			r.created_at
	FROM 	restaurants r
	WHERE 	r.employee_id = `employeeId`;
END

-- sp_u_restaurant_create
CREATE DEFINER=`phamtuanvu`@`%` PROCEDURE `phamtuanvu`.`sp_u_restaurant_create`(
	IN `employeeId` INT(11),
	IN `_name` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci,
	OUT `status_code` TINYINT(1),
	OUT `message_error` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci
)
store_procedure:BEGIN
	DECLARE `existingRestaurant` TINYINT(1);

	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		SET `status_code` = 1;
		GET DIAGNOSTICS CONDITION 1 `message_error` = MESSAGE_TEXT;
		SELECT `status_code`, `message_error`;
	END;

	SET `status_code` = 0;
	SET `message_error` = 'Success';

	SELECT 	COUNT(*)
	INTO 	`existingRestaurant`
	FROM 	restaurants r
	WHERE 	r.name = `_name`;

	IF `existingRestaurant` > 0 THEN
		SET `status_code` = 2;
		SET `message_error` = 'Tên nhà hàng đã tồn tại';
		LEAVE store_procedure;
	ELSE
		INSERT INTO restaurants (name, employee_id)
		VALUES 		(`_name`, `employeeId`);

		SELECT 		r.id,
	    			r.name,
	    			r.status,
	    			r.created_at
		FROM 		restaurants r
		WHERE 		r.name = `_name`;
	END IF;
END

-- sp_u_restaurants_create
CREATE DEFINER=`phamtuanvu`@`%` PROCEDURE `phamtuanvu`.`sp_u_restaurants_create`(
	IN `employeeId` INT(11),
	IN `restaurantsData` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci,
	OUT `status_code` TINYINT(1),
	OUT `message_error` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci
)
store_procedure:BEGIN
	DECLARE `jsonIdx` INT DEFAULT 0;
    DECLARE `restaurantName` VARCHAR(255);
    DECLARE `numRestaurants` INT DEFAULT JSON_LENGTH(`restaurantsData`);
   	DECLARE `existingRestaurantName` TINYINT(1);

	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		SET `status_code` = 1;
		GET DIAGNOSTICS CONDITION 1 `message_error` = MESSAGE_TEXT;
		SELECT `status_code`, `message_error`;
	END;

	SET `status_code` = 0;
	SET `message_error` = 'Success';

	DROP TEMPORARY TABLE IF EXISTS tbl_created_restaurant_ids;
	DROP TEMPORARY TABLE IF EXISTS tbl_created_restaurants;

	CREATE TEMPORARY TABLE tbl_created_restaurant_ids(
		id INT(11)
	);


	CREATE TEMPORARY TABLE tbl_created_restaurants(
		name TEXT CHARACTER SET utf8 COLLATE utf8_general_ci,
		employee_id INT(11)
	);

	WHILE `jsonIdx` < `numRestaurants` DO
		SET `restaurantName` = JSON_UNQUOTE(JSON_EXTRACT(`restaurantsData`, CONCAT('$[', `jsonIdx`, '].name')));

		SELECT 	COUNT(*)
		INTO 	`existingRestaurantName`
		FROM 	restaurants r
		WHERE 	r.name = `restaurantName`;

		IF `existingRestaurantName` > 0 THEN
			SET `status_code` = 2;
			SET `message_error` = CONCAT('Tên nhà hàng [', `restaurantName`, '] đã tồn tại');
			LEAVE store_procedure;
		ELSE
			INSERT INTO tbl_created_restaurants (name, employee_id)
			VALUES (`restaurantName`, `employeeId`);
		END IF;
	SET `jsonIdx` = `jsonIdx` + 1;
	END WHILE;

	INSERT INTO restaurants (name, employee_id)
	SELECT 		r.name,
				r.employee_id
	FROM 		tbl_created_restaurants r;

	INSERT INTO tbl_created_restaurant_ids
    SELECT id FROM restaurants WHERE name IN (SELECT name FROM tbl_created_restaurants);


	SELECT 	r.id,
            r.name,
            r.status,
            r.created_at
    FROM 	restaurants r
    WHERE	r.id IN(SELECT id FROM tbl_created_restaurant_ids);

	DROP TEMPORARY TABLE IF EXISTS tbl_created_restaurant_ids;
END
