-- Show related customer, vehicle, service_visit records (up to 20).
SELECT t0."customer_id" AS "customer_customer_id",
       t0."full_name" AS "customer_full_name",
       t1."vehicle_id" AS "vehicle_vehicle_id",
       t1."vin" AS "vehicle_vin",
       t2."service_visit_id" AS "service_visit_service_visit_id",
       t2."opened_at" AS "service_visit_opened_at"
FROM portfolio."customer" t0
JOIN portfolio."vehicle" t1 ON t1."customer_id" = t0."customer_id"
JOIN portfolio."service_visit" t2 ON t2."vehicle_id" = t1."vehicle_id"
ORDER BY t0."customer_id", t1."vehicle_id", t2."service_visit_id"
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT t0."customer_id" AS "customer_customer_id",
       t0."full_name" AS "customer_full_name",
       t1."vehicle_id" AS "vehicle_vehicle_id",
       t1."vin" AS "vehicle_vin",
       t2."service_visit_id" AS "service_visit_service_visit_id",
       t2."opened_at" AS "service_visit_opened_at"
FROM portfolio."customer" t0
JOIN portfolio."vehicle" t1 ON t1."customer_id" = t0."customer_id"
JOIN portfolio."service_visit" t2 ON t2."vehicle_id" = t1."vehicle_id"
ORDER BY t0."customer_id", t1."vehicle_id", t2."service_visit_id"
LIMIT 20;

-- Find service_visit records where opened_at matches "2025-03-01T08:00:00Z" (up to 20).
SELECT * FROM portfolio."service_visit"
WHERE "opened_at" IS NOT DISTINCT FROM '2025-03-01T08:00:00Z'
ORDER BY "service_visit_id"
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT * FROM portfolio."service_visit"
WHERE "opened_at" IS NOT DISTINCT FROM '2025-03-01T08:00:00Z'
ORDER BY "service_visit_id"
LIMIT 20;

-- Count vehicle records for each customer_id (up to 20 groups).
SELECT "customer_id", count(*) AS record_count
FROM portfolio."vehicle"
GROUP BY "customer_id"
ORDER BY record_count DESC, "customer_id" NULLS LAST
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT "customer_id", count(*) AS record_count
FROM portfolio."vehicle"
GROUP BY "customer_id"
ORDER BY record_count DESC, "customer_id" NULLS LAST
LIMIT 20;
