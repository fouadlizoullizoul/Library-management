CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255)  NOT NULL,
    password VARCHAR(255) NOT NULL
    email VARCHAR(255) UNIQUE NOT NULL
    role VARCHAR(255) DEFAULT 'user'
);