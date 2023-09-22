/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS  users(
   id SERIAL PRIMARY KEY,
   firstname varchar(100),
   lastname varchar(100),
   email varchar(100)UNIQUE,
   phone_number varchar(15),
   password varchar,
   batch VARCHAR(100) DEFAULT '1',
   cv VARCHAR,
   applicant_image VARCHAR,
   date_of_birth DATE DEFAULT '5/01/1957',
   address VARCHAR(100) DEFAULT 'area',
   university VARCHAR(100) DEFAULT 'school',
   course VARCHAR(100) DEFAULT 'program',
   cgpa NUMERIC DEFAULT 0,
   created_at TIMESTAMPTZ DEFAULT NOW(),
   updated_at TIMESTAMPTZ DEFAULT NOW()
)
