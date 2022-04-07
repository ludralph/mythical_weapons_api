CREATE TABLE books (
    id SERIAL PRIMARY  KEY,
    title VARCHAR(150) NOT NULL,
    total_pages integer NOT NULL,
    author VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    summary text
);