-- Automobile Management System: tables, keys and business constraints.
-- Run once in a fresh PostgreSQL database.
BEGIN;
SET LOCAL standard_conforming_strings = on;
CREATE SCHEMA portfolio;
CREATE TABLE portfolio."customer" (
  "customer_id" bigint NOT NULL,
  "full_name" text NOT NULL,
  "email" text NOT NULL,
  "created_at" timestamptz NOT NULL,
  CONSTRAINT "pk_customer" PRIMARY KEY ("customer_id"),
  CONSTRAINT "uq_customer_0" UNIQUE ("email")
);
CREATE TABLE portfolio."vehicle" (
  "vehicle_id" bigint NOT NULL,
  "customer_id" bigint NOT NULL,
  "vin" text NOT NULL,
  "make" text NOT NULL,
  "model" text NOT NULL,
  "model_year" bigint NOT NULL,
  CONSTRAINT "pk_vehicle" PRIMARY KEY ("vehicle_id"),
  CONSTRAINT "uq_vehicle_0" UNIQUE ("vin")
);
CREATE TABLE portfolio."service_visit" (
  "service_visit_id" bigint NOT NULL,
  "vehicle_id" bigint NOT NULL,
  "opened_at" timestamptz NOT NULL,
  "closed_at" timestamptz,
  "odometer_km" bigint NOT NULL,
  "status" text NOT NULL,
  CONSTRAINT "pk_service_visit" PRIMARY KEY ("service_visit_id")
);
ALTER TABLE portfolio."vehicle" ADD CONSTRAINT "fk_vehicle_0" FOREIGN KEY ("customer_id") REFERENCES portfolio."customer" ("customer_id");
ALTER TABLE portfolio."service_visit" ADD CONSTRAINT "fk_service_visit_0" FOREIGN KEY ("vehicle_id") REFERENCES portfolio."vehicle" ("vehicle_id");
ALTER TABLE portfolio."service_visit" ADD CONSTRAINT "nonnegative_odometer" CHECK ("odometer_km" >= 0);
CREATE UNIQUE INDEX "one_open_visit_per_vehicle" ON portfolio."service_visit" ("vehicle_id") WHERE ("status" = 'open');
COMMIT;
