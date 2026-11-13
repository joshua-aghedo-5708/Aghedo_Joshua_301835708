-- Fictional  records for Automobile Management System.
BEGIN;
SET LOCAL standard_conforming_strings = on;
INSERT INTO portfolio."customer" ("customer_id", "full_name", "email", "created_at") VALUES (101, 'Avery Chen', 'avery.chen@example.test', '2025-01-10T09:30:00Z');
INSERT INTO portfolio."customer" ("customer_id", "full_name", "email", "created_at") VALUES (102, 'Morgan Patel', 'morgan.patel@example.test', '2025-02-14T11:15:00Z');
INSERT INTO portfolio."vehicle" ("vehicle_id", "customer_id", "vin", "make", "model", "model_year") VALUES (201, 101, '1HGCM82633A004352', 'Honda', 'Accord', 2023);
INSERT INTO portfolio."vehicle" ("vehicle_id", "customer_id", "vin", "make", "model", "model_year") VALUES (202, 102, '2T3RFREV5JW700001', 'Toyota', 'RAV4', 2022);
INSERT INTO portfolio."service_visit" ("service_visit_id", "vehicle_id", "opened_at", "closed_at", "odometer_km", "status") VALUES (301, 201, '2025-03-01T08:00:00Z', NULL, 12500, 'open');
INSERT INTO portfolio."service_visit" ("service_visit_id", "vehicle_id", "opened_at", "closed_at", "odometer_km", "status") VALUES (302, 202, '2025-03-05T13:30:00Z', '2025-03-05T15:00:00Z', 28400, 'closed');
COMMIT;
