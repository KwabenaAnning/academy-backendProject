/* Replace with your SQL commands */
CREATE TYPE status_enum AS ENUM('pending', 'declined', 'approved');
CREATE TABLE application(
    id SERIAL PRIMARY KEY,
    user_id SERIAL REFERENCES users(id) ON DELETE CASCADE,
    application_batch_id SERIAL REFERENCES applicationsBatches(id) ON DELETE CASCADE,
    first_Name VARCHAR(30),
    last_Name VARCHAR(30),
    cv_url VARCHAR(100),
    image_url VARCHAR(100),
    email VARCHAR(30) UNIQUE,
    date_of_birth VARCHAR(30) ,
    address VARCHAR(50) ,
    university VARCHAR(70) ,
    course VARCHAR(50) ,
    cgpa DECIMAL(3, 2),
    status status_enum,
    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW()
);