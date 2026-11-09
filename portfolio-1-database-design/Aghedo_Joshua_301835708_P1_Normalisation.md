# Automobile Management System — normalisation

The example uses the saved sample records. The full set of fields is in the design and schema.

## Starting grouped records

| vehicle_id | service_visit records (list) |
| --- | --- |
| 201 | [301] |
| 202 | [302] |


The record IDs are grouped in a list. In 1NF, each record has its own row and each cell holds one value.

## 1NF: one value per cell

| service_visit.service_visit_id | service_visit.vehicle_id | service_visit.status | vehicle.vehicle_id | vehicle.customer_id | vehicle.vin | customer.customer_id | customer.full_name |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 301 | 201 | open | 201 | 101 | 1HGCM82633A004352 | 101 | Avery Chen |
| 302 | 202 | closed | 202 | 102 | 2T3RFREV5JW700001 | 102 | Morgan Patel |

Key: service_visit_id.

## 2NF: depend on the whole key

The declared candidate keys do not introduce a partial dependency here, so the 1NF rows stay unchanged at this step.

## service_visit_example

| service_visit.service_visit_id | service_visit.vehicle_id | service_visit.status | vehicle.vehicle_id | vehicle.customer_id | vehicle.vin | customer.customer_id | customer.full_name |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 301 | 201 | open | 201 | 101 | 1HGCM82633A004352 | 101 | Avery Chen |
| 302 | 202 | closed | 202 | 102 | 2T3RFREV5JW700001 | 102 | Morgan Patel |

## 3NF: store each entity’s details once

The entity keys determine their own descriptions. Related records keep foreign keys rather than repeating those descriptions.

## customer

| customer_id | full_name | email | created_at |
| --- | --- | --- | --- |
| 101 | Avery Chen | avery.chen@example.test | 2025-01-10T09:30:00+00:00 |
| 102 | Morgan Patel | morgan.patel@example.test | 2025-02-14T11:15:00+00:00 |

## vehicle

| vehicle_id | customer_id | vin | make | model | model_year |
| --- | --- | --- | --- | --- | --- |
| 201 | 101 | 1HGCM82633A004352 | Honda | Accord | 2023 |
| 202 | 102 | 2T3RFREV5JW700001 | Toyota | RAV4 | 2022 |

## service_visit

| service_visit_id | vehicle_id | opened_at | closed_at | odometer_km | status |
| --- | --- | --- | --- | --- | --- |
| 301 | 201 | 2025-03-01T08:00:00+00:00 | NULL | 12500 | open |
| 302 | 202 | 2025-03-05T13:30:00+00:00 | 2025-03-05T15:00:00+00:00 | 28400 | closed |

## Dependencies

- customer: (customer_id) → full_name, email, created_at
- vehicle: (vehicle_id) → customer_id, vin, make, model, model_year
- service_visit: (service_visit_id) → vehicle_id, opened_at, closed_at, odometer_km, status

Joining the decomposed sample tables reproduces the original 2 example rows. The design assumes the declared keys describe the relevant business dependencies.
