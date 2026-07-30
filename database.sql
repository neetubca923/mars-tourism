-- Execute this structural schema in your MySQL/PhpMyAdmin Control Room
CREATE DATABASE IF NOT EXISTS mars_spaceport;
USE mars_spaceport;

CREATE TABLE IF NOT EXISTS passenger_manifest (
    id INT AUTO_INCREMENT PRIMARY KEY,
    surname VARCHAR(100) NOT NULL,
    agency_id VARCHAR(50) NOT NULL,
    trajectory VARCHAR(100) NOT NULL,
    total_price VARCHAR(50) NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
