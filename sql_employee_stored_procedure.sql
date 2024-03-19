-- sp_g_employee
CREATE DEFINER=`phamtuanvu`@`%` PROCEDURE `phamtuanvu`.`sp_g_employee`(
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

    SELECT 		e.id,
    			e.username,
    			e.full_name,
    			e.gender,
    			e.birthday,
    			e.phone_number,
    			e.status,
    			e.created_at
    FROM 		employees e
    WHERE 		e.id = `employeeId`
   				AND e.status  = 0;


END

-- sp_g_employees
CREATE DEFINER=`phamtuanvu`@`%` PROCEDURE `phamtuanvu`.`sp_g_employees`(
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

	SELECT 		e.id,
    			e.username,
    			e.full_name,
    			e.gender,
    			e.birthday,
    			e.phone_number,
    			e.status,
    			e.created_at
	FROM 		employees e;
END

-- sp_u_employee_password
CREATE DEFINER=`phamtuanvu`@`%` PROCEDURE `phamtuanvu`.`sp_u_employee_password`(
	IN `employeeId` INT(11),
	IN `_password` TINYINT(1),
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

	UPDATE 		employees e
	SET 		e.password = `_password`
	WHERE 		e.id = `employeeId`;

	SELECT 		e.id,
    			e.username,
    			e.full_name,
    			e.gender,
    			e.birthday,
    			e.phone_number,
    			e.status,
    			e.created_at,
    			status_code,
    			message_error
	FROM 		employees e
	WHERE 		e.id = `employeeId`;
END

-- sp_u_employee_status
CREATE DEFINER=`phamtuanvu`@`%` PROCEDURE `phamtuanvu`.`sp_u_employee_status`(
	IN `employeeId` INT(11),
	IN `_status` TINYINT(1),
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

	UPDATE 		employees e
	SET 		e.status = `_status`
	WHERE 		e.id = `employeeId`;

	SELECT 		e.id,
    			e.username,
    			e.full_name,
    			e.gender,
    			e.birthday,
    			e.phone_number,
    			e.status,
    			e.created_at
	FROM 		employees e
	WHERE 		e.id = `employeeId`;
END
