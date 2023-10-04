CREATE TABLE assessments(
    id SERIAL PRIMARY KEY,
    application_batch_id SERIAL REFERENCES applicationsBatches(id) ON DELETE CASCADE,
    image_url VARCHAR(100),
    time_allocated VARCHAR(100),
    questions JSON,
    status boolean DEFAULT true,
    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW()
)