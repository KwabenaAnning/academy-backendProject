CREATE TABLE applicationsBatches(
    id SERIAL PRIMARY KEY,
    image_url VARCHAR(150),
    link VARCHAR(110),
    deadline VARCHAR(80),
    batch_id SERIAL UNIQUE,
    instructions VARCHAR(600),
    status boolean DEFAULT true,
    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW()
);
