--sp_g_table
CREATE DEFINER=`phamtuanvu`@`%` PROCEDURE `phamtuanvu`.`sp_g_table`(
	IN `employeeId` INT(11),
	IN `tableId` INT(11),
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

	SELECT 	t.id,
			t.name,
			t.status,
			t.created_at
	FROM 	tables t
	WHERE 	t.employee_id = `employeeId`
			AND t.id = `tableId`;
END

--sp_g_tables
CREATE DEFINER=`phamtuanvu`@`%` PROCEDURE `phamtuanvu`.`sp_g_tables`(
	IN `employeeId` INT(11),
	OUT `status_code` TINYINT(1),
	OUT `message_error` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci
)
BEGIN
	DECLARE `index` INT(3) DEFAULT 0;
    DECLARE `countNumber` INT(3) DEFAULT 0;
    DECLARE `isExitRestaurantBrandName` TINYINT(1);
   	DECLARE `isExitRestaurantBrand` TINYINT(1) DEFAULT 0;

	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		SET `status_code` = 1;
		GET DIAGNOSTICS CONDITION 1 `message_error` = MESSAGE_TEXT;
		SELECT `status_code`, `message_error`;
	END;

	SET `status_code` = 0;
	SET `message_error` = 'Success';

	SELECT 	t.id,
			t.name,
			t.status,
			t.created_at
	FROM 	tables t
	WHERE 	t.employee_id = `employeeId`;
END

--sp_u_table_name
CREATE DEFINER=`phamtuanvu`@`%` PROCEDURE `phamtuanvu`.`sp_u_table_name`(
	IN `employeeId` INT(11),
	IN `tableId` INT(11),
	IN `tableData` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci,
	OUT `status_code` TINYINT(1),
	OUT `message_error` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci
)
store_procedure:BEGIN

	DECLARE `isExistTableName` TINYINT(1) DEFAULT 0;

	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		SET `status_code` = 1;
		GET DIAGNOSTICS CONDITION 1 `message_error` = MESSAGE_TEXT;
		SELECT `status_code`, `message_error`;
	END;

	SET `status_code` = 0;
	SET `message_error` = 'Success';

	SELECT 		COUNT(*)
	INTO 		`isExistTableName`
	FROM 		tables t
	WHERE 		t.name = JSON_UNQUOTE(JSON_EXTRACT(`tableData`, '$.name'))
				AND t.employee_id = `employeeId`
				AND t.id != `tableId`;

	IF `isExistTableName` > 0 THEN
		SET `status_code` = 2;
		SET `message_error` = 'Tên bàn đã tồn tại';
		LEAVE store_procedure;
	END IF;

	UPDATE 	tables t
	SET 	t.name = JSON_UNQUOTE(JSON_EXTRACT(`tableData`, '$.name'))
	WHERE 	t.id = `tableId`
			AND t.employee_id = `employeeId`;

	SELECT 	t.id,
			t.name,
			t.status,
			t.created_at
	FROM 	tables t
	WHERE 	t.employee_id = `employeeId`
			AND t.id = `tableId`;
END

--sp_u_table_create
CREATE DEFINER=`phamtuanvu`@`%` PROCEDURE `phamtuanvu`.`sp_u_table_create`(
	IN `employeeId` INT(11),
	IN `tableData` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci,
	OUT `status_code` TINYINT(1),
	OUT `message_error` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci
)
store_procedure:BEGIN

	DECLARE `isExistTableName` TINYINT(1) DEFAULT 0;

	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		SET `status_code` = 1;
		GET DIAGNOSTICS CONDITION 1 `message_error` = MESSAGE_TEXT;
		SELECT `status_code`, `message_error`;
	END;

	SET `status_code` = 0;
	SET `message_error` = 'Success';

	SELECT 		COUNT(*)
	INTO 		`isExistTableName`
	FROM 		tables t
	WHERE 		t.name = JSON_UNQUOTE(JSON_EXTRACT(`tableData`, '$.name'))
				AND t.restaurant_id = JSON_UNQUOTE(JSON_EXTRACT(`tableData`, '$.restaurant_id'))
				AND t.restaurant_brand_id = JSON_UNQUOTE(JSON_EXTRACT(`tableData`, '$.restaurant_brand_id'))
				AND t.area_id = JSON_UNQUOTE(JSON_EXTRACT(`tableData`, '$.area_id'))
				AND t.employee_id = `employeeId`;

	IF `isExistTableName` > 0 THEN
		SET `status_code` = 2;
		SET `message_error` = 'Tên bàn đã tồn tại';
		LEAVE store_procedure;
	END IF;

	INSERT INTO tables (name, restaurant_id, restaurant_brand_id, area_id, employee_id)
				SELECT 	JSON_UNQUOTE(JSON_EXTRACT(`tableData`, '$.name')),
						JSON_UNQUOTE(JSON_EXTRACT(`tableData`, '$.restaurant_id')),
						JSON_UNQUOTE(JSON_EXTRACT(`tableData`, '$.restaurant_brand_id')),
						JSON_UNQUOTE(JSON_EXTRACT(`tableData`, '$.area_id')),
						`employeeId`;

	SELECT 	t.id,
			t.name,
			t.status,
			t.created_at
	FROM 	tables t
	WHERE 	t.employee_id = `employeeId`
			AND t.name = JSON_UNQUOTE(JSON_EXTRACT(`tableData`, '$.name'))
			AND t.restaurant_id = JSON_UNQUOTE(JSON_EXTRACT(`tableData`, '$.restaurant_id'))
			AND t.restaurant_brand_id = JSON_UNQUOTE(JSON_EXTRACT(`tableData`, '$.restaurant_brand_id'))
			AND t.area_id = JSON_UNQUOTE(JSON_EXTRACT(`tableData`, '$.area_id'));
END


--sp_u_tables_create
CREATE DEFINER=`phamtuanvu`@`%` PROCEDURE `phamtuanvu`.`sp_u_tables_create`(
	IN `employeeId` INT(11),
	IN `tablesData` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci,
	OUT `status_code` TINYINT(1),
	OUT `message_error` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci
)
store_procedure:BEGIN
	DECLARE `isExistTableName` TINYINT(1) DEFAULT 0;
	DECLARE `index` INT(3) DEFAULT 0;
    DECLARE `countNumber` INT(3) DEFAULT 0;
   	DECLARE `tableName` VARCHAR(255);
	DECLARE `tableExists` TINYINT(1);
	DECLARE `tableExistsLength` TINYINT(1);

	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		SET `status_code` = 1;
		GET DIAGNOSTICS CONDITION 1 `message_error` = MESSAGE_TEXT;
		SELECT `status_code`, `message_error`;
	END;

	SET `status_code` = 0;
	SET `message_error` = 'Success';

	DROP TEMPORARY TABLE IF EXISTS tbl_tables;
	CREATE TEMPORARY TABLE tbl_tables(
		name VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci,
		restaurant_id INT(11),
		restaurant_brand_id INT(11),
		area_id INT(11)
	);

	DROP TEMPORARY TABLE IF EXISTS tbl_exit_tables;
	CREATE TEMPORARY TABLE tbl_exit_tables(
		idx TINYINT(3),
		message VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci
	);

	SET `countNumber` = JSON_LENGTH(`tablesData`, '$');
	WHILE `index` < `countNumber` DO
		SET `tableName` = JSON_UNQUOTE(JSON_EXTRACT(`tablesData`, CONCAT('$[', `index`, '].name')));
	   	SET `tableExists` = 0;

	    SELECT COUNT(*) INTO `tableExists` FROM tables WHERE name = `tableName`;

	   	IF `tableExists` > 0 THEN
	        INSERT INTO tbl_exit_tables (idx, message)
	        			SELECT `index`, "Tên bàn đã tồn tại";
	    ELSE
	        INSERT INTO tbl_tables (name, restaurant_id, restaurant_brand_id, area_id)
						SELECT 		JSON_UNQUOTE(JSON_EXTRACT(`tablesData`, CONCAT('$[', `index`, '].name'))),
									JSON_UNQUOTE(JSON_EXTRACT(`tablesData`, CONCAT('$[', `index`, '].restaurant_id'))),
									JSON_UNQUOTE(JSON_EXTRACT(`tablesData`, CONCAT('$[', `index`, '].restaurant_brand_id'))),
									JSON_UNQUOTE(JSON_EXTRACT(`tablesData`, CONCAT('$[', `index`, '].area_id')));
	    END IF;

		SET `index` = `index` + 1;
	END WHILE;


	SELECT 		COUNT(*)
	INTO 		`isExistTableName`
	FROM 		tbl_exit_tables;

	SET `isExistTableName` = (
								CASE
									WHEN `isExistTableName` > 0
									THEN 1
									ELSE (SELECT COUNT(*) FROM tbl_tables tt GROUP BY tt.name HAVING COUNT(*) > 1 LIMIT 1)
								END
							 );

	IF `isExistTableName` > 0 THEN
		SELECT COUNT(*) INTO `tableExistsLength` FROM tbl_exit_tables;

		SET `status_code` = 1;

		IF(`tableExistsLength` > 0) THEN
			SELECT CONCAT('[', GROUP_CONCAT(CONCAT('{"index":', idx, ',"message":"', message, '"}')), ']')
		    INTO `message_error`
		    FROM tbl_exit_tables;
		ELSE
			SET `message_error` = "Các tên bàn đã nhập bị trùng";
		END IF;

		LEAVE store_procedure;
	END IF;

	INSERT INTO tables (name, employee_id, restaurant_id, restaurant_brand_id, area_id)
				SELECT	tt.name,
						`employeeId`,
						tt.restaurant_id,
						tt.restaurant_brand_id,
						tt.area_id
				FROM tbl_tables tt;

	SELECT 	t.id,
			t.name,
			t.status,
			t.created_at
	FROM 	tables t
	WHERE 	t.employee_id = `employeeId`
			AND t.name IN(SELECT name FROM tbl_tables)
			AND t.restaurant_id IN(SELECT restaurant_id FROM tbl_tables)
			AND t.restaurant_brand_id IN(SELECT restaurant_brand_id FROM tbl_tables)
			AND t.area_id IN(SELECT area_id FROM tbl_tables);
END
