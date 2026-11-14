# MIT 8103 Advanced Database Systems

**Automobile Management System** · Joshua Aghedo · Student ID 301835708

## Case study

I chose Automobile Management System as the case study as I previously worked in this area and had a good experience. I created a database for service advisors, fleet managers and customers to view previous car repairs. There are three tables, customer, vehicle, service_visit. Each table handles the necessary functions such as adding new drivers and cars, updating opened and closed service visits and viewing service history.

## Portfolio 1: Database Design and Modelling

It was a good decision to create three tables in the relational design. Each table has primary keys, foreign keys and check constraints to manage the database. Partial unique constraints were added to the vehicle_id column to ensure only one active visit exists per vehicle. I have also detailed how the tables were normalized to 3NF from 1NF. All was completed well and I tested with 10 invalid inserts and all were prevented due to the rules

![Automobile Management System ER diagram](images/Aghedo_Joshua_301835708_ERDiagram.png)

Figure 1. Tables, keys and relationships. PK: primary key; FK: foreign key; UK: unique value.

<!-- PAGE BREAK -->

## Portfolio 2: Query Processing and Optimisation

Three SQL queries were performed on the sample data. Two rows were returned from the join which included Avery Chen with VIN 1HGCM82633A004352. I added 20000 additional rows to test indexes. The index reduced the median time taken to retrieve information to 0.191ms from 1.172ms. The data was identical between the tests and the query plan showed that the new index was used.

## Portfolio 3: Transactions and Concurrency

I used a temporary counter in the service_visit table to test the different transactions. The update was not visible in the other session as it had not been committed. When rolled back it reverted to the previously committed value. As no locks were used, the counter increased by 2. When using SELECT FOR UPDATE, Session B had to wait for Session A to finish, resulting in the final value being 3. The helper is only for this exercise and the business fields from the case are unchanged

## Portfolio 4: NoSQL and Advanced Data Models

I used the auto_service_events table for the event documents in the case. 4 sample events were added using MongoDB and the queries returned the expected results. The validation prevented inserting an invalid date type and duplicate event ID. The embedded snapshot allows the related details to be stored with the event. Details can vary depending on the event type. These events are fictional and PostgreSQL will still apply its relational rules.

## Repository and evidence

https://github.com/joshua-aghedo-5708/Aghedo_Joshua_301835708

The portfolio folders contain the SQL and JavaScript, explanations, query plans, result tables and screenshots.


<!-- PAGE BREAK -->

## Portfolio 5: Distributed and Cloud Database Exercise

I proposed having three replica members in MongoDB, each in their own failure zone. This discusses primary elections, majority acknowledgement, secondary lag and the trade-offs between sharding and auto_service_events. Replication helps with availability and backups help with recovery. PostgreSQL will need its own availability strategy. This is the only option available to discuss and no active replica set was used.

## Individual reflection

I separated the customer, vehicle and service_visit tables to ensure the details are stored without duplication. Only one service visit can be opened per vehicle so a partial unique constraint should be placed on the vehicle_id column. This constraint will check that only one can be opened. The constraint checks ensure that the correct values are present along with the correct relationships. An issue I faced was when using two sessions, both can view the same value. Using a lock on the row ensures both increments are counted. The index comparison shows that I need to look at the execution plan to ensure that the database is not doing unnecessary work.

## AI-use declaration

GitHub Copilot was used to help me understand the problem statement and the course materials.

## References

- [PostgreSQL: constraints](https://www.postgresql.org/docs/17/ddl-constraints.html)
- [PostgreSQL: EXPLAIN](https://www.postgresql.org/docs/17/using-explain.html)
- [PostgreSQL: isolation](https://www.postgresql.org/docs/17/transaction-iso.html)
- [PostgreSQL: row locks](https://www.postgresql.org/docs/17/explicit-locking.html)
- [MongoDB: data modelling](https://www.mongodb.com/docs/manual/data-modeling/)
- [MongoDB: replication](https://www.mongodb.com/docs/manual/replication/)
- [MongoDB: sharding](https://www.mongodb.com/docs/manual/sharding/)
- [Mermaid: ER diagrams](https://mermaid.js.org/syntax/entityRelationshipDiagram.html)

