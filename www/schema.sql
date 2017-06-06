drop database if exists awesome;

create database awesome;

use awesome;

grant SELECT, INSERT, UPDATE, DELETE, on awesome.* to 'www-data'@'localhost'
identified by 'www-data'

create table users (
  `id` VARCHAR(50) not NULL,
  `email` VARCHAR(50) not NULL,
  `passwd` VARCHAR(50) not NULL,
  `admin` bool not NULL,
  `name` VARCHAR(50) not NULL,
  `image` VARCHAR(500) NOT NULL,
  `create_at` REAL NOT NULL,
  UNIQUE KEY `idx_email` (`email`),
  KEY `idx_created_at` (`created_at`)
  PRIMARY KEY (`id`)
) engine=innodb DEFAULT charset=utf8;


create table blogs (
  `id` VARCHAR(50) not NULL,
  `user_id` VARCHAR(50) not NULL,
  `user_name` VARCHAR(50) not NULL,
  `user_image` VARCHAR(500) NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `summary` VARCHAR(200) not NULL,
  `content` mediumtext not NULL,
  `create_at` REAL NOT NULL,
  KEY `idx_created_at` (`created_at`)
  PRIMARY KEY (`id`)
) engine=innodb DEFAULT charset=utf8;


create table comments (
  `id` VARCHAR(50) not NULL,
  `blog_id` VARCHAR(50) NOT NULL,
  `user_id` VARCHAR(50) not NULL,
  `user_name` VARCHAR(50) not NULL,
  `user_image` VARCHAR(500) NOT NULL,
  `content` mediumtext not NULL,
  `create_at` REAL NOT NULL,
  KEY `idx_created_at` (`created_at`)
  PRIMARY KEY (`id`)
) engine=innodb DEFAULT charset=utf8;