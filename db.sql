DROP DATABASE IF EXISTS schuelerverwaltung;
CREATE DATABASE schuelerverwaltung;
USE schuelerverwaltung;


CREATE TABLE students
(
  firstName   varchar(64) NOT NULL,
  sirName     varchar(64) NOT NULL,
  cls         varchar(10)  NOT NULL,
  dir         varchar(10),
  PRIMARY KEY (firstName, sirName, cls)
);