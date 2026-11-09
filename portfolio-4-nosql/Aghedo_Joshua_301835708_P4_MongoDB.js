// Run once in mongosh against a fresh exercise database.
// These records are fictional events for the case study.
(async function () {
  db = db.getSiblingDB('portfolio_nosql');
  if ((await db.getCollectionNames()).includes("auto_service_events")) {
    throw new Error('The exercise collection already exists. Use a fresh database.');
  }

  // The validator checks the stable event fields while details can vary.
  await db.createCollection("auto_service_events", {
    validator: {
    "$jsonSchema": {
        "bsonType": "object",
        "required": [
            "_id",
            "schemaVersion",
            "simulation",
            "eventType",
            "occurredAt",
            "source",
            "embedded",
            "references",
            "details"
        ],
        "properties": {
            "_id": {
                "bsonType": "string",
                "minLength": 1
            },
            "schemaVersion": {
                "enum": [
                    1
                ]
            },
            "simulation": {
                "enum": [
                    true
                ]
            },
            "eventType": {
                "bsonType": "string",
                "enum": [
                    "visit_opened",
                    "inspection_recorded"
                ]
            },
            "occurredAt": {
                "bsonType": "date"
            },
            "source": {
                "bsonType": "object",
                "required": [
                    "entity",
                    "key",
                    "snapshot"
                ],
                "properties": {
                    "entity": {
                        "enum": [
                            "service_visit"
                        ]
                    },
                    "key": {
                        "bsonType": "object",
                        "required": [
                            "service_visit_id"
                        ]
                    },
                    "snapshot": {
                        "bsonType": "object"
                    }
                }
            },
            "embedded": {
                "bsonType": "object"
            },
            "references": {
                "bsonType": "object"
            },
            "details": {
                "bsonType": "object"
            }
        }
    }
},
    validationLevel: 'strict', validationAction: 'error'
  });

  // Insert the four example events and show their IDs.
  printjson(await db.getCollection("auto_service_events").insertMany([
    {
        "_id": "event_000001",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "visit_opened",
        "occurredAt": ISODate("2030-01-01T10:00:00Z"),
        "source": {
            "entity": "service_visit",
            "key": {
                "service_visit_id": 301
            },
            "snapshot": {
                "service_visit_id": 301,
                "vehicle_id": 201,
                "opened_at": "2025-03-01T08:00:00Z",
                "closed_at": null,
                "odometer_km": 12500,
                "status": "open"
            }
        },
        "embedded": {
            "vehicle": [
                {
                    "key": {
                        "vehicle_id": 201
                    },
                    "snapshot": {
                        "vehicle_id": 201,
                        "customer_id": 101,
                        "vin": "1HGCM82633A004352",
                        "make": "Honda",
                        "model": "Accord",
                        "model_year": 2023
                    },
                    "via": [
                        "service_visit.vehicle_id → vehicle"
                    ]
                }
            ]
        },
        "references": {
            "customer": [
                {
                    "key": {
                        "customer_id": 101
                    },
                    "via": [
                        "service_visit.vehicle_id → vehicle.customer_id → customer"
                    ]
                }
            ]
        },
        "details": {
            "channel": "web"
        }
    },
    {
        "_id": "event_000002",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "inspection_recorded",
        "occurredAt": ISODate("2030-01-01T10:01:00Z"),
        "source": {
            "entity": "service_visit",
            "key": {
                "service_visit_id": 301
            },
            "snapshot": {
                "service_visit_id": 301,
                "vehicle_id": 201,
                "opened_at": "2025-03-01T08:00:00Z",
                "closed_at": null,
                "odometer_km": 12500,
                "status": "open"
            }
        },
        "embedded": {
            "vehicle": [
                {
                    "key": {
                        "vehicle_id": 201
                    },
                    "snapshot": {
                        "vehicle_id": 201,
                        "customer_id": 101,
                        "vin": "1HGCM82633A004352",
                        "make": "Honda",
                        "model": "Accord",
                        "model_year": 2023
                    },
                    "via": [
                        "service_visit.vehicle_id → vehicle"
                    ]
                }
            ]
        },
        "references": {
            "customer": [
                {
                    "key": {
                        "customer_id": 101
                    },
                    "via": [
                        "service_visit.vehicle_id → vehicle.customer_id → customer"
                    ]
                }
            ]
        },
        "details": {
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "examples": {
                "inspection_findings": "illustrative inspection_findings",
                "parts_used": "illustrative parts_used",
                "technician_notes": "illustrative technician_notes"
            }
        }
    },
    {
        "_id": "event_000003",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "visit_opened",
        "occurredAt": ISODate("2030-01-01T10:02:00Z"),
        "source": {
            "entity": "service_visit",
            "key": {
                "service_visit_id": 302
            },
            "snapshot": {
                "service_visit_id": 302,
                "vehicle_id": 202,
                "opened_at": "2025-03-05T13:30:00Z",
                "closed_at": "2025-03-05T15:00:00Z",
                "odometer_km": 28400,
                "status": "closed"
            }
        },
        "embedded": {
            "vehicle": [
                {
                    "key": {
                        "vehicle_id": 202
                    },
                    "snapshot": {
                        "vehicle_id": 202,
                        "customer_id": 102,
                        "vin": "2T3RFREV5JW700001",
                        "make": "Toyota",
                        "model": "RAV4",
                        "model_year": 2022
                    },
                    "via": [
                        "service_visit.vehicle_id → vehicle"
                    ]
                }
            ]
        },
        "references": {
            "customer": [
                {
                    "key": {
                        "customer_id": 102
                    },
                    "via": [
                        "service_visit.vehicle_id → vehicle.customer_id → customer"
                    ]
                }
            ]
        },
        "details": {
            "channel": "web"
        }
    },
    {
        "_id": "event_000004",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "inspection_recorded",
        "occurredAt": ISODate("2030-01-01T10:03:00Z"),
        "source": {
            "entity": "service_visit",
            "key": {
                "service_visit_id": 302
            },
            "snapshot": {
                "service_visit_id": 302,
                "vehicle_id": 202,
                "opened_at": "2025-03-05T13:30:00Z",
                "closed_at": "2025-03-05T15:00:00Z",
                "odometer_km": 28400,
                "status": "closed"
            }
        },
        "embedded": {
            "vehicle": [
                {
                    "key": {
                        "vehicle_id": 202
                    },
                    "snapshot": {
                        "vehicle_id": 202,
                        "customer_id": 102,
                        "vin": "2T3RFREV5JW700001",
                        "make": "Toyota",
                        "model": "RAV4",
                        "model_year": 2022
                    },
                    "via": [
                        "service_visit.vehicle_id → vehicle"
                    ]
                }
            ]
        },
        "references": {
            "customer": [
                {
                    "key": {
                        "customer_id": 102
                    },
                    "via": [
                        "service_visit.vehicle_id → vehicle.customer_id → customer"
                    ]
                }
            ]
        },
        "details": {
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "examples": {
                "inspection_findings": "illustrative inspection_findings",
                "parts_used": "illustrative parts_used",
                "technician_notes": "illustrative technician_notes"
            }
        }
    }
]));
  await db.getCollection("auto_service_events").createIndex({eventType: 1, occurredAt: -1}, {name: 'event_type_time'});

  // 1. Find the first sample event type (up to five documents).
  printjson(await db.getCollection("auto_service_events").find({"eventType":"visit_opened"}).sort({_id:1}).limit(5).toArray());

  // 2. Find events for the first source record using nested key fields (up to five).
  printjson(await db.getCollection("auto_service_events").find({"source.key.service_visit_id":301}).sort({_id:1}).limit(5).toArray());

  // 3. Find events in the sample time range using a MongoDB Date filter (up to five).
  printjson(await db.getCollection("auto_service_events").find({"occurredAt":{"$gte":ISODate("2030-01-01T10:00:00Z"), "$lt":ISODate("2030-01-01T11:00:00Z")}}).sort({_id:1}).limit(5).toArray());

  // 4. Count documents for each event type.
  printjson(await db.getCollection("auto_service_events").aggregate([{"$group":{"_id":"$eventType", "documentCount":{"$sum":1}}}, {"$sort":{"_id":1}}]).toArray());

  // A date stored as text should be rejected by the validator.
  try {
    await db.getCollection("auto_service_events").insertOne({...{
    "_id": "event_000001",
    "schemaVersion": 1,
    "simulation": true,
    "eventType": "visit_opened",
    "occurredAt": ISODate("2030-01-01T10:00:00Z"),
    "source": {
        "entity": "service_visit",
        "key": {
            "service_visit_id": 301
        },
        "snapshot": {
            "service_visit_id": 301,
            "vehicle_id": 201,
            "opened_at": "2025-03-01T08:00:00Z",
            "closed_at": null,
            "odometer_km": 12500,
            "status": "open"
        }
    },
    "embedded": {
        "vehicle": [
            {
                "key": {
                    "vehicle_id": 201
                },
                "snapshot": {
                    "vehicle_id": 201,
                    "customer_id": 101,
                    "vin": "1HGCM82633A004352",
                    "make": "Honda",
                    "model": "Accord",
                    "model_year": 2023
                },
                "via": [
                    "service_visit.vehicle_id → vehicle"
                ]
            }
        ]
    },
    "references": {
        "customer": [
            {
                "key": {
                    "customer_id": 101
                },
                "via": [
                    "service_visit.vehicle_id → vehicle.customer_id → customer"
                ]
            }
        ]
    },
    "details": {
        "channel": "web"
    }
}, _id: 'invalid_date_example', occurredAt: 'not-a-date'});
  } catch (error) { print('Invalid date error: ' + error.code); }

  // Reusing an event ID should be rejected by the unique _id index.
  try { await db.getCollection("auto_service_events").insertOne({
    "_id": "event_000001",
    "schemaVersion": 1,
    "simulation": true,
    "eventType": "visit_opened",
    "occurredAt": ISODate("2030-01-01T10:00:00Z"),
    "source": {
        "entity": "service_visit",
        "key": {
            "service_visit_id": 301
        },
        "snapshot": {
            "service_visit_id": 301,
            "vehicle_id": 201,
            "opened_at": "2025-03-01T08:00:00Z",
            "closed_at": null,
            "odometer_km": 12500,
            "status": "open"
        }
    },
    "embedded": {
        "vehicle": [
            {
                "key": {
                    "vehicle_id": 201
                },
                "snapshot": {
                    "vehicle_id": 201,
                    "customer_id": 101,
                    "vin": "1HGCM82633A004352",
                    "make": "Honda",
                    "model": "Accord",
                    "model_year": 2023
                },
                "via": [
                    "service_visit.vehicle_id → vehicle"
                ]
            }
        ]
    },
    "references": {
        "customer": [
            {
                "key": {
                    "customer_id": 101
                },
                "via": [
                    "service_visit.vehicle_id → vehicle.customer_id → customer"
                ]
            }
        ]
    },
    "details": {
        "channel": "web"
    }
}); }
  catch (error) { print('Duplicate ID error: ' + error.code); }

  print('Document count: ' + await db.getCollection("auto_service_events").countDocuments());
})().catch(error => { print(error.stack || String(error)); quit(1); });
