# Automobile Management System — database design

My case study records customer, vehicle, service_visit.

## Users

- Service advisors
- Fleet administrators
- Customers reviewing their vehicle service history

## Main operations

- Register customers and vehicles
- Open and close vehicle service visits
- Review service history by vehicle or customer

## Entities

| Entity | Information stored |
| --- | --- |
| customer | Person or organization responsible for one or more vehicles. |
| vehicle | Automobile registered to a customer. |
| service_visit | A service appointment and its current status for a vehicle. |

## customer

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| customer_id | BIGINT | PK | Yes |
| full_name | TEXT |  | Yes |
| email | TEXT | Unique | Yes |
| created_at | TIMESTAMPTZ |  | Yes |
- Unique key: (email).

## vehicle

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| vehicle_id | BIGINT | PK | Yes |
| customer_id | BIGINT | FK | Yes |
| vin | TEXT | Unique | Yes |
| make | TEXT |  | Yes |
| model | TEXT |  | Yes |
| model_year | INTEGER |  | Yes |
- customer_id → customer.customer_id
- Unique key: (vin).

## service_visit

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| service_visit_id | BIGINT | PK | Yes |
| vehicle_id | BIGINT | FK | Yes |
| opened_at | TIMESTAMPTZ |  | Yes |
| closed_at | TIMESTAMPTZ |  | No |
| odometer_km | INTEGER |  | Yes |
| status | TEXT |  | Yes |
- vehicle_id → vehicle.vehicle_id

## Relationships and business rules

- Every customer record must include an email address.
- A customer email address identifies at most one customer.
- Each vehicle must reference an existing customer.
- A vehicle identification number may appear on only one vehicle record.
- Each service visit must reference an existing vehicle.
- The recorded vehicle odometer reading must be zero or greater.
- At most one service visit per vehicle may have status open; enforce with a partial unique constraint on vehicle_id for rows whose status is open.

## Assumptions

- Identifiers are generated from one shared globally unique ID space.
- A vehicle belongs to exactly one customer; a service visit belongs to exactly one vehicle.
- A vehicle may have many service visits, but at most one visit with status open at a time.
- For a normalization example, use service_visit as the root because it references vehicle. Keep visit-specific attributes with service_visit and reference vehicle by vehicle_id rather than repeating vehicle or customer attributes in the visit.

