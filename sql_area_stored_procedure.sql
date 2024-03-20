--sp_u_area_create
CREATE DEFINER=`phamtuanvu`@`%` PROCEDURE `phamtuanvu`.`sp_u_area_create`(
	IN `employeeId` INT(11),
	IN `areaData` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci,
	OUT `status_code` TINYINT(1),
	OUT `message_error` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci
)
store_procedure:BEGIN

	DECLARE `isExitAreaName` TINYINT(1) DEFAULT 0;

	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		SET `status_code` = 1;
		GET DIAGNOSTICS CONDITION 1 `message_error` = MESSAGE_TEXT;
		SELECT `status_code`, `message_error`;
	END;

	SET `status_code` = 0;
	SET `message_error` = 'Success';

	SELECT 		COUNT(*)
	INTO 		`isExitAreaName`
	FROM 		areas a
	WHERE 		a.name = JSON_UNQUOTE(JSON_EXTRACT(`areaData`, '$.name'))
				AND a.restaurant_id = JSON_UNQUOTE(JSON_EXTRACT(`areaData`, '$.restaurant_id'))
				AND a.restaurant_brand_id = JSON_UNQUOTE(JSON_EXTRACT(`areaData`, '$.restaurant_brand_id'))
				AND a.branch_id = JSON_UNQUOTE(JSON_EXTRACT(`areaData`, '$.branch_id'))
				AND a.employee_id = `employeeId`;

	IF `isExitAreaName` > 0 THEN
		SET `status_code` = 2;
		SET `message_error` = 'Tên khu vực đã tồn tại';
		LEAVE store_procedure;
	END IF;

	INSERT INTO areas 	(name, restaurant_id, restaurant_brand_id, branch_id, employee_id)
				SELECT 	JSON_UNQUOTE(JSON_EXTRACT(`areaData`, '$.name')),
						JSON_UNQUOTE(JSON_EXTRACT(`areaData`, '$.restaurant_id')),
						JSON_UNQUOTE(JSON_EXTRACT(`areaData`, '$.restaurant_brand_id')),
						JSON_UNQUOTE(JSON_EXTRACT(`areaData`, '$.branch_id')),
						`employeeId`;

	SELECT 	a.id,
			a.name,
			a.status,
			a.created_at
	FROM 	areas a
	WHERE 	a.name = JSON_UNQUOTE(JSON_EXTRACT(`areaData`, '$.name'))
			AND a.restaurant_id = JSON_UNQUOTE(JSON_EXTRACT(`areaData`, '$.restaurant_id'))
			AND a.restaurant_brand_id = JSON_UNQUOTE(JSON_EXTRACT(`areaData`, '$.restaurant_brand_id'))
			AND a.branch_id = JSON_UNQUOTE(JSON_EXTRACT(`areaData`, '$.branch_id'))
			AND a.employee_id = `employeeId`;

END


--sp_u_areas_create
CREATE DEFINER=`phamtuanvu`@`%` PROCEDURE `phamtuanvu`.`sp_u_areas_create`(
	IN `employeeId` INT(11),
	IN `areasData` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci,
	OUT `status_code` TINYINT(1),
	OUT `message_error` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci
)
store_procedure:BEGIN
	DECLARE `index` TINYINT(3) DEFAULT 0;
	DECLARE `countNumber` TINYINT(3) DEFAULT 0;

	DECLARE `isExitAreaName` TINYINT(1) DEFAULT 0;
	DECLARE `areaName` VARCHAR(255);
	DECLARE `areaExists` TINYINT(1);
	DECLARE `areaExistsLength` TINYINT(1);

	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		SET `status_code` = 1;
		GET DIAGNOSTICS CONDITION 1 `message_error` = MESSAGE_TEXT;
		SELECT `status_code`, `message_error`;
	END;

	SET `status_code` = 0;
	SET `message_error` = 'Success';

	DROP TEMPORARY TABLE IF EXISTS tbl_areas;
	CREATE TEMPORARY TABLE tbl_areas(
		name VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci,
		restaurant_id INT(11),
		restaurant_brand_id INT(11),
		branch_id INT(11)
	);

	DROP TEMPORARY TABLE IF EXISTS tbl_exit_areas;
	CREATE TEMPORARY TABLE tbl_exit_areas(
		idx TINYINT(3),
		message VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci
	);

	SET `countNumber` = JSON_LENGTH(`areasData`, '$');
	WHILE `index` < `countNumber` DO
		SET `areaName` = JSON_UNQUOTE(JSON_EXTRACT(`areasData`, CONCAT('$[', `index`, '].name')));
	   	SET `areaExists` = 0;

	    SELECT COUNT(*) INTO `areaExists` FROM areas WHERE name = `areaName`;

	   	IF `areaExists` > 0 THEN
	        INSERT INTO tbl_exit_areas (idx, message)
	        			SELECT `index`, "Tên khu vực đã tồn tại";
	    ELSE
	        INSERT INTO tbl_areas (name, restaurant_id, restaurant_brand_id, branch_id)
						SELECT 	   JSON_UNQUOTE(JSON_EXTRACT(`areasData`, CONCAT('$[', `index`, '].name'))),
								   JSON_UNQUOTE(JSON_EXTRACT(`areasData`, CONCAT('$[', `index`, '].restaurant_id'))),
								   JSON_UNQUOTE(JSON_EXTRACT(`areasData`, CONCAT('$[', `index`, '].restaurant_brand_id'))),
								   JSON_UNQUOTE(JSON_EXTRACT(`areasData`, CONCAT('$[', `index`, '].branch_id')));
	    END IF;


		SET `index` = `index` + 1;
	END WHILE;

	SELECT 		COUNT(*)
	INTO 		`isExitAreaName`
	FROM 		tbl_exit_areas;

	SET `isExitAreaName` =  (
								CASE
									WHEN `isExitAreaName` > 0
									THEN 1
									ELSE (SELECT COUNT(*) FROM tbl_areas ta GROUP BY ta.name HAVING COUNT(*) > 1 LIMIT 1)
								END
							);

	IF `isExitAreaName` > 0 THEN
		SELECT COUNT(*) INTO `areaExistsLength` FROM tbl_exit_areas;

		SET `status_code` = 1;

		IF(`areaExistsLength` > 0) THEN
			SELECT CONCAT('[', GROUP_CONCAT(CONCAT('{"index":', idx, ',"message":"', message, '"}')), ']')
		    INTO `message_error`
		    FROM tbl_exit_areas;
		ELSE
			SET `message_error` = "Các tên khu vực đã nhập bị trùng";
		END IF;

		LEAVE store_procedure;
	END IF;

	INSERT INTO areas (name, employee_id, restaurant_id, restaurant_brand_id, branch_id)
				SELECT ta.name,
					   `employeeId`,
					   ta.restaurant_id,
					   ta.restaurant_brand_id,
					   ta.branch_id
				FROM   tbl_areas ta;

	SELECT 		a.id,
				a.name,
				a.status,
				a.created_at
	FROM 		areas a
	WHERE 		a.name IN (SELECT name FROM tbl_areas)
				AND a.restaurant_id IN (SELECT restaurant_id FROM tbl_areas)
				AND a.restaurant_brand_id IN (SELECT restaurant_brand_id FROM tbl_areas)
				AND a.branch_id IN (SELECT branch_id FROM tbl_areas)
				AND a.employee_id = `employeeId`;
END


--sp_u_area_name
CREATE DEFINER=`phamtuanvu`@`%` PROCEDURE `phamtuanvu`.`sp_u_area_name`(
	IN `employeeId` INT(11),
	IN `areaId` INT(11),
	IN `areaData` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci,
	OUT `status_code` TINYINT(1),
	OUT `message_error` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci
)
store_procedure:BEGIN

	DECLARE `isExitAreaName` TINYINT(1) DEFAULT 0;

	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		SET `status_code` = 1;
		GET DIAGNOSTICS CONDITION 1 `message_error` = MESSAGE_TEXT;
		SELECT `status_code`, `message_error`;
	END;

	SET `status_code` = 0;
	SET `message_error` = 'Success';

	SELECT 		COUNT(*)
	INTO 		`isExitAreaName`
	FROM 		areas a
	WHERE 		a.name = JSON_UNQUOTE(JSON_EXTRACT(`areaData`, '$.name'))
				AND a.restaurant_id = JSON_UNQUOTE(JSON_EXTRACT(`areaData`, '$.restaurant_id'))
				AND a.restaurant_brand_id = JSON_UNQUOTE(JSON_EXTRACT(`areaData`, '$.restaurant_brand_id'))
				AND a.branch_id = JSON_UNQUOTE(JSON_EXTRACT(`areaData`, '$.branch_id'))
				AND a.employee_id = `employeeId`
				AND a.id = `areaId`;

	IF `isExitAreaName` > 0 THEN
		SET `status_code` = 2;
		SET `message_error` = 'Tên khu vực đã tồn tại';
		LEAVE store_procedure;
	END IF;

	UPDATE 		areas a
	SET 		a.name = JSON_UNQUOTE(JSON_EXTRACT(`areaData`, '$.name'))
	WHERE 		a.id = `areaId`;

	SELECT 	a.id,
			a.name,
			a.status,
			a.created_at
	FROM 	areas a
	WHERE 	a.id = `areaId`;
END
