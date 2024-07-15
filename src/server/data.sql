CREATE DATABASE myshelf;

CREATE TABLE shelf(
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(100),
    author VARCHAR(100),
    publisher VARCHAR(100),
    email VARCHAR(255),
    publisher_date VARCHAR(255),
    thumbnail VARCHAR(500),
    categories VARCHAR(500),
    volume_id VARCHAR(500)
);

CREATE TABLE users(
    user_name VARCHAR(100),
    email VARCHAR(255) PRIMARY KEY,
    hashed_password VARCHAR(255)
);

CREATE TABLE notes(
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(100),
    note VARCHAR(3000),
    volume_id VARCHAR(500),
    email VARCHAR(255),
    comment_date VARCHAR(255)
);