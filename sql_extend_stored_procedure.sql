CREATE DEFINER=`phamtuanvu`@`%` PROCEDURE `phamtuanvu`.`sp_g_restaurant_detail`(
	IN `employeeId` INT(11),
	IN `_status` TINYINT(1),
	OUT `status_code` TINYINT(1),
	OUT `message_error` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci
)
BEGIN
	DECLARE `restaurant_data` JSON;
    DECLARE `apply_status_condition` BOOLEAN DEFAULT TRUE;

	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		SET `status_code` = 1;
		GET DIAGNOSTICS CONDITION 1 `message_error` = MESSAGE_TEXT;
		SELECT `status_code`, `message_error`;
	END;

	SET `status_code` = 0;
	SET `message_error` = 'Success';


    IF `_status` = -1 THEN
        SET `apply_status_condition` = FALSE;
    END IF;

    -- Danh sách nhà hàng
    SELECT
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', r.id,
                'name', r.name,
                -- Danh sách thương hiệu
                'restaurant_brands', (
                    SELECT JSON_OBJECT(
                        'total_record', COUNT(rb.id),
                        'list', JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'id', rb.id,
                                'name', rb.name,
                                -- Danh sách chi nhánh
                                'branches', (
                                    SELECT JSON_OBJECT(
                                        'total_record', COUNT(b.id),
                                        'list', JSON_ARRAYAGG(
                                            JSON_OBJECT(
                                                'id', b.id,
                                                'name', b.name,
                                                -- Danh sách khu vực
                                                'areas', (
                                                    SELECT JSON_OBJECT(
                                                        'total_record', COUNT(a.id),
                                                        'list', JSON_ARRAYAGG(
                                                            JSON_OBJECT(
                                                                'id', a.id,
                                                                'name', a.name,
                                                                -- Danh sách bàn
                                                                'tables', (
                                                                    SELECT JSON_ARRAYAGG(
                                                                        JSON_OBJECT(
                                                                            'id', t.id,
                                                                            'name', t.name,
                                                                            'status', t.status
                                                                        )
                                                                    ) FROM 	tables t
                                                                      WHERE t.area_id = a.id
                                                                      		AND (NOT `apply_status_condition` OR t.status = `_status`)
                                                                      		AND t.employee_id = `employeeId`
                                                                )
                                                            )
                                                        )
                                                    ) FROM 	areas a
                                                      WHERE a.branch_id = b.id
                                                      		AND (NOT `apply_status_condition` OR a.status = `_status`)
                                                      		AND a.employee_id = `employeeId`
                                                )
                                            )
                                        )
                                    ) FROM 	branches b
                                      WHERE b.restaurant_id = r.id
                                      		AND b.restaurant_brand_id = rb.id
                                      		AND (NOT `apply_status_condition` OR b.status = `_status`)
                                      		AND b.employee_id = `employeeId`
                                )
                            )
                        )
                    ) FROM restaurant_brands rb
                      WHERE rb.restaurant_id = r.id
                      		AND (NOT `apply_status_condition` OR rb.status = `_status`)
                      		AND rb.employee_id = `employeeId`
                )
            )
        )
    INTO 	`restaurant_data`
    FROM 	restaurants r
   	WHERE 	r.employee_id = `employeeId`
   			AND (NOT `apply_status_condition` OR r.status = `_status`);

    -- Trả về dữ liệu JSON
  	SELECT `restaurant_data` as data;
END
