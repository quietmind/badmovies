DROP DATABASE IF EXISTS badmovies;

CREATE DATABASE badmovies;

USE badmovies;

CREATE TABLE favorite (
	id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
	title VARCHAR(255),
	rating VARCHAR(255),
	releasedate VARCHAR(255),
	averagerating VARCHAR(255)
);	

