CREATE TABLE IF NOT EXISTS units (
    id SERIAL PRIMARY KEY,
    unit TEXT,
    selected BOOLEAN DEFAULT false,
    updated_on TIMESTAMPTZ DEFAULT now(),
    blknum TEXT,
    level TEXT,
    unitnum TEXT,
);

CREATE TABLE IF NOT EXISTS units_users (
    id SERIAL PRIMARY KEY,
    unit_id INTEGER,
    user_id INTEGER
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT,
    password TEXT,
    email TEXT
);

-- psql -d hdbtest -U postgres -f tables.sql