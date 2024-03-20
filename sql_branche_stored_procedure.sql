--sp_u_branches_create
CREATE DEFINER=`phamtuanvu`@`%` PROCEDURE `phamtuanvu`.`sp_u_branches_create`(
	IN `employeeId` INT(11),
	IN `branchesData` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci,
	OUT `status_code` TINYINT(1),
    OUT `message_error` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci
)
store_procedure:BEGIN

	DECLARE `index` INT(3) DEFAULT 0;
    DECLARE `countNumber` INT(3) DEFAULT 0;
    DECLARE `isExitBranche` TINYINT(1) DEFAULT 0;
   	DECLARE `brancheName` VARCHAR(255);
	DECLARE `brancheExists` TINYINT(1);
	DECLARE `brancheExistsLength` TINYINT(1);

	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		SET `status_code` = 1;
		GET DIAGNOSTICS CONDITION 1 `message_error` = MESSAGE_TEXT;
		SELECT `status_code`, `message_error`;
	END;

	SET `status_code` = 0;
	SET `message_error` = 'Success';

	DROP TEMPORARY TABLE IF EXISTS tbl_branches;
	CREATE TEMPORARY TABLE tbl_branches(
		name VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci,
		employee_id INT(11),
		restaurant_id INT(11),
		restaurant_brand_id INT(11)
	);

	DROP TEMPORARY TABLE IF EXISTS tbl_exit_branches;
	CREATE TEMPORARY TABLE tbl_exit_branches(
		idx TINYINT(3),
		message VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci
	);

	SET `countNumber` = JSON_LENGTH(`branchesData`, '$');
	WHILE `index` < `countNumber` DO
		SET `brancheName` = JSON_UNQUOTE(JSON_EXTRACT(`branchesData`, CONCAT('$[', `index`, '].name')));

	    SELECT COUNT(*) INTO `brancheExists` FROM branches b  WHERE name = `brancheName`;

	   	IF `brancheExists` > 0 THEN
	        INSERT INTO tbl_exit_branches (idx, message)
	        			SELECT `index`, "Tên chi nhánh đã tồn tại";
	    ELSE
	        INSERT INTO tbl_branches (name, employee_id, restaurant_id, restaurant_brand_id)
						SELECT		  JSON_UNQUOTE(JSON_EXTRACT(`branchesData`, CONCAT('$[', `index`, '].name'))),
									  `employeeId`,
									  JSON_UNQUOTE(JSON_EXTRACT(`branchesData`, CONCAT('$[', `index`, '].restaurant_id'))),
									  JSON_UNQUOTE(JSON_EXTRACT(`branchesData`, CONCAT('$[', `index`, '].restaurant_brand_id')));
	    END IF;


		SET `index` = `index` + 1;
	END WHILE;


	SELECT 		COUNT(*)
	INTO 		`isExitBranche`
	FROM 		tbl_exit_branches;

	SET `isExitBranche` = 	(
								CASE
							        WHEN `isExitBranche` > 0
							        THEN 1
							        ELSE (
							            SELECT COUNT(*)
							            FROM tbl_branches b
							            GROUP BY b.name
							            HAVING COUNT(*) > 1
							            LIMIT 1
							         )
							    END
							);

	IF `isExitBranche` > 0 THEN
		SELECT COUNT(*) INTO `brancheExistsLength` FROM tbl_exit_branches;

		SET `status_code` = 2;

		IF(`brancheExistsLength` > 0) THEN
			SELECT CONCAT('[', GROUP_CONCAT(CONCAT('{"index":', idx, ',"message":"', message, '"}')), ']')
		    INTO `message_error`
		    FROM tbl_exit_branches;
		ELSE
			SET `message_error` = "Tên chi nhánh đã nhập bị trùng";
		END IF;

		LEAVE store_procedure;
	END IF;

	INSERT INTO branches (name, employee_id, restaurant_id, restaurant_brand_id)
				SELECT 	  b.name,
						  b.employee_id,
						  b.restaurant_id,
						  b.restaurant_brand_id
				FROM 	  tbl_branches b;

	DROP TEMPORARY TABLE IF EXISTS tbl_branches;
	DROP TEMPORARY TABLE IF EXISTS tbl_exit_branches;

END


--sp_u_branche_create
CREATE DEFINER=`phamtuanvu`@`%` PROCEDURE `phamtuanvu`.`sp_u_branche_create`(
	IN `employeeId` INT(11),
	IN `branchData` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci,
	OUT `status_code` TINYINT(1),
    OUT `message_error` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci
)
store_procedure:BEGIN
	DECLARE `isExitBranche` TINYINT(1) DEFAULT 0;

	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		SET `status_code` = 1;
		GET DIAGNOSTICS CONDITION 1 `message_error` = MESSAGE_TEXT;
		SELECT `status_code`, `message_error`;
	END;

	SET `status_code` = 0;
	SET `message_error` = 'Success';

	SELECT 	COUNT(*)
	INTO 	`isExitBranche`
	FROM 	branches b
	WHERE 	b.name = JSON_UNQUOTE(JSON_EXTRACT(`branchData`, '$.name'))
			AND b.employee_id = `employeeId`
			AND b.restaurant_id = JSON_UNQUOTE(JSON_EXTRACT(`branchData`, '$.restaurant_id'))
			AND b.restaurant_brand_id = JSON_UNQUOTE(JSON_EXTRACT(`branchData`, '$.restaurant_brand_id'));

	IF isExitBranche > 0 THEN
		SET `status_code` = 2;
		SET `message_error` = 'Tên chi nhánh đã tồn tại';
		LEAVE store_procedure;
	END IF;

	INSERT INTO branches (name, employee_id, restaurant_id, restaurant_brand_id)
				SELECT	  JSON_UNQUOTE(JSON_EXTRACT(`branchData`, '$.name')),
						  `employeeId`,
						  JSON_UNQUOTE(JSON_EXTRACT(`branchData`, '$.restaurant_id')),
						  JSON_UNQUOTE(JSON_EXTRACT(`branchData`, '$.restaurant_brand_id'));

	SELECT 	b.id,
			b.name,
			b.status,
			b.created_at
	FROM 	branches b
	WHERE 	b.id = LAST_INSERT_ID();
END


--sp_u_branche
CREATE DEFINER=`phamtuanvu`@`%` PROCEDURE `phamtuanvu`.`sp_u_branche`(
	IN `employeeId` INT(11),
	IN `brancheId` INT(11),
	IN `_name` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci,
	OUT `status_code` TINYINT(1),
	OUT `message_error` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci
)
store_procedure:BEGIN
	DECLARE `isExitBranche` TINYINT(1) DEFAULT 0;
	DECLARE `isExitBrancheName` TINYINT(1) DEFAULT 0;
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		SET `status_code` = 1;
		GET DIAGNOSTICS CONDITION 1 `message_error` = MESSAGE_TEXT;
		SELECT `status_code`, `message_error`;
	END;

	SET `status_code` = 0;
	SET `message_error` = 'Success';

	SELECT 	COUNT(*)
	INTO 	`isExitBranche`
	FROM	branches b
	WHERE 	b.id = `brancheId`
			AND b.employee_id = `employeeId`;

	IF(`isExitBranche` < 1) THEN
		SET `status_code` = 2;
		SET `message_error` = 'Không tìm thấy chi nhánh';
		LEAVE store_procedure;
	END IF;

	SELECT 	COUNT(*)
	INTO 	`isExitBrancheName`
	FROM 	branches b
	WHERE 	b.name = `_name`
			AND b.id != `brancheId`;

	IF(`isExitBrancheName` > 0) THEN
		SET `status_code` = 2;
		SET `message_error` = 'Tên chi nhánh đã tồn tại';
		LEAVE store_procedure;
	END IF;

	UPDATE branches b
	SET name = `_name`
	WHERE b.id = `brancheId`;

	SELECT 	b.id,
			b.name,
			b.status,
			b.created_at
	FROM 	branches b
	WHERE 	b.employee_id = `employeeId`
			AND b.id = `brancheId`;
END
