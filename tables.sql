CREATE TABLE IF NOT EXISTS units (
    id SERIAL PRIMARY KEY,
    name TEXT,
    blk_id INTEGER,
    selected BOOLEAN DEFAULT false,
    data_on TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS blks (
    id SERIAL PRIMARY KEY,
    name TEXT
);

-- psql -d fintrack -U postgres -f tables.sql