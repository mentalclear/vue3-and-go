CREATE TABLE users (
    id serial PRIMARY KEY,    
    email VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX unique_email ON users (email);

CREATE TABLE tokens (
    id serial PRIMARY KEY,        
    user_id INTEGER NULL,
    email VARCHAR(255) NOT NULL,    
    token VARCHAR(60) NOT NULL,
    token_hash BYTEA NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    expiry TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT fk_users
      FOREIGN KEY(user_id)
	  REFERENCES users(id)
	  ON DELETE CASCADE
      ON UPDATE CASCADE      
);

ALTER TABLE tokens
ALTER COLUMN expiry TYPE TIMESTAMP WITH TIME ZONE;

INSERT INTO users
-- VALUES (1, 'admin@example.com', 'Admin', 'User', '$2a$12$T/mN3H5hT/p8vqf2uGhd8unrSMzsum8bitshu.IUNnoHrtZ.ObGqm', NOW(), NOW());
VALUES (2, 'you@there.com', 'You', 'There', '$2a$12$T/mN3H5hT/p8vqf2uGhd8unrSMzsum8bitshu.IUNnoHrtZ.ObGqm', NOW(), NOW());

UPDATE users 
SET password = '$2a$12$3Lr8Z1VUvIC3UEJXZAkGJenZoNkK50QpCD9xW8JKn9RYkCrxqR24m'
WHERE id = 2;


SELECT * FROM users;

SELECT * FROM tokens;



DELETE FROM users WHERE id = 3;

DELETE FROM users;

DELETE FROM tokens;












DROP TABLE tokens;
