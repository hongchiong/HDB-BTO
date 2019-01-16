CREATE TABLE IF NOT EXISTS units (
    id SERIAL PRIMARY KEY,
    unit_num TEXT,
    blk_id INTEGER,
    selected BOOLEAN DEFAULT false,
    data_on TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS blks (
    id SERIAL PRIMARY KEY,
    blk_num TEXT
);

-- psql -d fintrack -U postgres -f tables.sql