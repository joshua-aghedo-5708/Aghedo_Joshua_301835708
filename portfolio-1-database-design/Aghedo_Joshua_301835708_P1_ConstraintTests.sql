-- Run these deliberately invalid statements one at a time, outside a transaction.
-- Each should fail at the named constraint; the sample rows should remain unchanged.

-- 1. customer pk violation. Expected: pk_customer, SQLSTATE 23505.
INSERT INTO portfolio."customer" ("customer_id", "full_name", "email", "created_at")
VALUES (101, 'Casey Rivera', 'casey.rivera@example.test', '2025-03-10T10:00:00Z');

-- 2. customer email violation. Expected: uq_customer_0, SQLSTATE 23505.
INSERT INTO portfolio."customer" ("customer_id", "full_name", "email", "created_at")
VALUES (1001, 'Casey Rivera', 'avery.chen@example.test', '2025-03-10T10:00:00Z');

-- 3. customer name not null. Expected: full_name, SQLSTATE 23502.
INSERT INTO portfolio."customer" ("customer_id", "full_name", "email", "created_at")
VALUES (1002, NULL, 'casey.rivera@example.test', '2025-03-10T10:00:00Z');

-- 4. vehicle pk violation. Expected: pk_vehicle, SQLSTATE 23505.
INSERT INTO portfolio."vehicle" ("vehicle_id", "customer_id", "vin", "make", "model", "model_year")
VALUES (201, 101, '3FA6P0H74HR100001', 'Ford', 'Fusion', 2021);

-- 5. vehicle vin violation. Expected: uq_vehicle_0, SQLSTATE 23505.
INSERT INTO portfolio."vehicle" ("vehicle_id", "customer_id", "vin", "make", "model", "model_year")
VALUES (1003, 101, '1HGCM82633A004352', 'Honda', 'Civic', 2020);

-- 6. vehicle customer fk violation. Expected: fk_vehicle_0, SQLSTATE 23503.
INSERT INTO portfolio."vehicle" ("vehicle_id", "customer_id", "vin", "make", "model", "model_year")
VALUES (1004, 9001, '3FA6P0H74HR100002', 'Ford', 'Focus', 2019);

-- 7. visit pk violation. Expected: pk_service_visit, SQLSTATE 23505.
INSERT INTO portfolio."service_visit" ("service_visit_id", "vehicle_id", "opened_at", "closed_at", "odometer_km", "status")
VALUES (301, 202, '2025-03-11T08:00:00Z', '2025-03-11T09:00:00Z', 29000, 'closed');

-- 8. visit vehicle fk violation. Expected: fk_service_visit_0, SQLSTATE 23503.
INSERT INTO portfolio."service_visit" ("service_visit_id", "vehicle_id", "opened_at", "closed_at", "odometer_km", "status")
VALUES (1005, 9002, '2025-03-11T10:00:00Z', NULL, 100, 'open');

-- 9. visit odometer check violation. Expected: nonnegative_odometer, SQLSTATE 23514.
INSERT INTO portfolio."service_visit" ("service_visit_id", "vehicle_id", "opened_at", "closed_at", "odometer_km", "status")
VALUES (1006, 202, '2025-03-12T08:00:00Z', '2025-03-12T09:00:00Z', -1, 'closed');

-- 10. visit open partial unique violation. Expected: one_open_visit_per_vehicle, SQLSTATE 23505.
INSERT INTO portfolio."service_visit" ("service_visit_id", "vehicle_id", "opened_at", "closed_at", "odometer_km", "status")
VALUES (1007, 201, '2025-03-13T08:00:00Z', NULL, 13000, 'open');
