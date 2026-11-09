# Automobile Management System — SQL queries

## 1. Show related customer, vehicle, service_visit records (up to 20).

```sql
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
```

| customer_customer_id | customer_full_name | vehicle_vehicle_id | vehicle_vin | service_visit_service_visit_id | service_visit_opened_at |
| --- | --- | --- | --- | --- | --- |
| 101 | Avery Chen | 201 | 1HGCM82633A004352 | 301 | 2025-03-01T08:00:00+00:00 |
| 102 | Morgan Patel | 202 | 2T3RFREV5JW700001 | 302 | 2025-03-05T13:30:00+00:00 |

## 2. Find service_visit records where opened_at matches "2025-03-01T08:00:00Z" (up to 20).

```sql
SELECT * FROM portfolio."service_visit"
WHERE "opened_at" IS NOT DISTINCT FROM '2025-03-01T08:00:00Z'
ORDER BY "service_visit_id"
LIMIT 20;
```

| service_visit_id | vehicle_id | opened_at | closed_at | odometer_km | status |
| --- | --- | --- | --- | --- | --- |
| 301 | 201 | 2025-03-01T08:00:00+00:00 | NULL | 12500 | open |

## 3. Count vehicle records for each customer_id (up to 20 groups).

```sql
SELECT "customer_id", count(*) AS record_count
FROM portfolio."vehicle"
GROUP BY "customer_id"
ORDER BY record_count DESC, "customer_id" NULLS LAST
LIMIT 20;
```

| customer_id | record_count |
| --- | --- |
| 101 | 1 |
| 102 | 1 |


## Index comparison

| Phase | Median (ms) | Three runs (ms) | Plan nodes | Buffer hits |
| --- | --- | --- | --- | --- |
| Before index | 1.172 | 2.21, 1.172, 1.009 | Sort → Seq Scan | 112 |
| After index | 0.191 | 0.187, 0.32, 0.191 | Sort → Bitmap Heap Scan → Bitmap Index Scan | 25 |

The median execution time changed from 1.172 ms to 0.191 ms. The measured plan used p2_filter_idx. The results matched in both phases. An index adds storage and write-maintenance costs; timings depend on the selected lookup and environment.

## Execution plans

### Before index, run 1

```text
Sort (actual time=2.169..2.171 rows=20 loops=1)
  Seq Scan on service_visit (actual time=0.022..2.124 rows=20 loops=1)
Planning Time: 0.466 ms
Execution Time: 2.21 ms
```

### Before index, run 2

```text
Sort (actual time=1.144..1.145 rows=20 loops=1)
  Seq Scan on service_visit (actual time=0.017..1.106 rows=20 loops=1)
Planning Time: 0.404 ms
Execution Time: 1.172 ms
```

### Before index, run 3

```text
Sort (actual time=0.981..0.983 rows=20 loops=1)
  Seq Scan on service_visit (actual time=0.017..0.947 rows=20 loops=1)
Planning Time: 0.376 ms
Execution Time: 1.009 ms
```

### After index, run 1

```text
Sort (actual time=0.127..0.129 rows=20 loops=1)
  Bitmap Heap Scan on service_visit (actual time=0.028..0.093 rows=20 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.015..0.015 rows=20 loops=1)
Planning Time: 0.553 ms
Execution Time: 0.187 ms
```

### After index, run 2

```text
Sort (actual time=0.21..0.212 rows=20 loops=1)
  Bitmap Heap Scan on service_visit (actual time=0.041..0.123 rows=20 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.021..0.022 rows=20 loops=1)
Planning Time: 0.83 ms
Execution Time: 0.32 ms
```

### After index, run 3

```text
Sort (actual time=0.133..0.135 rows=20 loops=1)
  Bitmap Heap Scan on service_visit (actual time=0.029..0.099 rows=20 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.016..0.016 rows=20 loops=1)
Planning Time: 0.559 ms
Execution Time: 0.191 ms
```

## Reproduce

Use a fresh database with the Portfolio 1 schema and sample data. Run Aghedo_Joshua_301835708_P2_Queries.sql, then Aghedo_Joshua_301835708_P2_Optimisation.sql. The optimisation script creates a separate performance table and runs EXPLAIN (ANALYZE, BUFFERS).

[Query screenshot](screenshots/Aghedo_Joshua_301835708_P2_QueryResults.png) · [Index comparison](screenshots/Aghedo_Joshua_301835708_P2_IndexComparison.png)

## References

- [PostgreSQL — EXPLAIN](https://www.postgresql.org/docs/17/using-explain.html)

