CREATE TABLE users (
    id serial PRIMARY KEY,    
    email VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);


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


INSERT INTO users
VALUES (1, 'admin@example.com', 'Admin', 'User', '$2a$12$T/mN3H5hT/p8vqf2uGhd8unrSMzsum8bitshu.IUNnoHrtZ.ObGqm', NOW(), NOW());

SELECT * FROM users;






DROP TABLE tokens;