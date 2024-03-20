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
	DECLARE `index` INT DEFAULT 0;
    DECLARE `countNumber` INT DEFAULT 0;
   	DECLARE `isExitRestaurant` TINYINT(1);
   	DECLARE `restaurantName` VARCHAR(255);
	DECLARE `restaurantExists` TINYINT(1);
	DECLARE `restaurantExistsLength` TINYINT(1);

	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		SET `status_code` = 1;
		GET DIAGNOSTICS CONDITION 1 `message_error` = MESSAGE_TEXT;
		SELECT `status_code`, `message_error`;
	END;

	SET `status_code` = 0;
	SET `message_error` = 'Success';

	DROP TEMPORARY TABLE IF EXISTS tbl_restaurants;
	CREATE TEMPORARY TABLE tbl_restaurants(
		name VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci
	);

	DROP TEMPORARY TABLE IF EXISTS tbl_exit_restaurants;
	CREATE TEMPORARY TABLE tbl_exit_restaurants(
		idx TINYINT(3),
		message VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci
	);

	SET `countNumber` = JSON_LENGTH(`restaurantsData`, '$');
	WHILE `index` < `countNumber` DO

		SET `restaurantName` = JSON_UNQUOTE(JSON_EXTRACT(`restaurantsData`, CONCAT('$[', `index`, '].name')));
	   	SET `restaurantExists` = 0;

	    SELECT COUNT(*) INTO `restaurantExists` FROM restaurants WHERE name = `restaurantName`;

	   	IF `restaurantExists` > 0 THEN
	        INSERT INTO tbl_exit_restaurants (idx, message)
	        			SELECT `index`, "Tên nhà hàng đã tồn tại";
	    ELSE
	        INSERT INTO tbl_restaurants (name)
					SELECT JSON_UNQUOTE(JSON_EXTRACT(`restaurantsData`, CONCAT('$[', `index`, '].name')));
	    END IF;

		SET `index` = `index` + 1;
	END WHILE;

	SELECT COUNT(*)
	INTO `isExitRestaurant`
	FROM tbl_exit_restaurants;

	SET `isExitRestaurant` = (
								CASE
									WHEN `isExitRestaurant` > 0
									THEN 1
									ELSE (SELECT COUNT(*) FROM tbl_restaurants r GROUP BY r.name HAVING COUNT(*) > 1 LIMIT 1)
								END
							 );

	IF `isExitRestaurant` > 0 THEN
		SELECT COUNT(*) INTO `restaurantExistsLength` FROM tbl_exit_restaurants;

		SET `status_code` = 1;

		IF(`restaurantExistsLength` > 0) THEN
			SELECT CONCAT('[', GROUP_CONCAT(CONCAT('{"index":', idx, ',"message":"', message, '"}')), ']')
		    INTO `message_error`
		    FROM tbl_exit_restaurants;
		ELSE
			SET `message_error` = "Các tên nhà hàng đã nhập bị trùng";
		END IF;

		LEAVE store_procedure;
	END IF;

	INSERT INTO restaurants (name, employee_id)
	SELECT 		r.name,
				`employeeId`
	FROM 		tbl_restaurants r;

	SELECT 	r.id,
            r.name,
            r.status,
            r.created_at
    FROM 	restaurants r
    WHERE	r.name IN(SELECT name FROM tbl_restaurants);

	DROP TEMPORARY TABLE IF EXISTS tbl_restaurants;
END
