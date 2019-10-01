DROP DATABASE IF EXISTS schuelerverwaltung;
CREATE DATABASE schuelerverwaltung;
USE schuelerverwaltung;

-- CREATE TABLE subscribers
-- (
--   fullName varchar(255) NOT NULL,
--   email    varchar(255) NOT NULL,
--   type     varchar(16)  NOT NULL,
--   text     varchar(255) NOT NULL,
--   fromSite     varchar(64) NOT NULL,
--   PRIMARY KEY (fullName, email)
-- );

-- CREATE TABLE newsletter
-- (
--   email varchar(255) NOT NULL PRIMARY KEY
-- );

CREATE TABLE students
(
  firstName   varchar(64) NOT NULL,
  sirName     varchar(64) NOT NULL,
  cls         varchar(4)  NOT NULL,
  dir         varchar(10),
  PRIMARY KEY (firstName, sirName, class)
);