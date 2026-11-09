# Automobile Management System — ER diagram

```mermaid
erDiagram
    direction LR
    customer {
        bigint customer_id PK
        text full_name
        text email UK
        timestamptz created_at
    }
    vehicle {
        bigint vehicle_id PK
        bigint customer_id FK
        text vin UK
        text make
        text model
        integer model_year
    }
    service_visit {
        bigint service_visit_id PK
        bigint vehicle_id FK
        timestamptz opened_at
        timestamptz closed_at "Optional"
        integer odometer_km
        text status
    }
    customer ||--o{ vehicle : "customer_id"
    vehicle ||--o{ service_visit : "vehicle_id"
```

PK identifies a record; FK links to another table; UK marks a single-field unique value. The relationship ends show exactly one, zero or one, or zero or many records. Composite unique keys and conditional rules are listed in the schema and design.

[Diagram image](../images/Aghedo_Joshua_301835708_ERDiagram.png)
