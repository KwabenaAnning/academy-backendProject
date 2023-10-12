/* Replace with your SQL commands */
CREATE TYPE role_type AS ENUM('user', 'superAdminstrator');

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(30),
    lastName VARCHAR(30),
    email VARCHAR(100) UNIQUE,
    phoneNumber VARCHAR(100) UNIQUE,
    password VARCHAR(100),
    salt VARCHAR(100),
    role role_type,
    status boolean DEFAULT true,
    country VARCHAR(255),
    taken BOOLEAN DEFAULT false,
    testScores INTEGER DEFAULT 0,
    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW()
);
