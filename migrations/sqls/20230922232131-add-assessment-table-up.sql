CREATE TABLE assessments(
    id SERIAL PRIMARY KEY,
    application_batch_id VARCHAR(10) DEFAULT '1',
    image_url VARCHAR(100),
    time_allocated VARCHAR(100),
    questions JSON,
    status boolean DEFAULT true,
    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW()
)