CREATE DATABASE myshelf;

CREATE TABLE shelf(
    id VARCHAR(255) PRIMARY KEY,
    book_title VARCHAR(100),
    book_author VARCHAR(100),
    book_publisher VARCHAR(100)
);

CREATE TABLE users(
    user_name VARCHAR(100),
    email VARCHAR(255) PRIMARY KEY,
    hashed_password VARCHAR(255)
);