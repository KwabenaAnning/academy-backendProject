/* Replace with your SQL commands */

CREATE TYPE role_type AS ENUM('user', 'superAdminstrator');
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(40),
    lastName VARCHAR(40),
    email VARCHAR(100) UNIQUE,
    phoneNumber VARCHAR(100) UNIQUE,
    password VARCHAR(100),
    salt VARCHAR(100),
    role role_type,
    status boolean DEFAULT true,
    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW()
);