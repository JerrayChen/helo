CREATE TABLE USERS(
	id serial PRIMARY KEY NOT NULL,
	username varchar(20),
	password varchar(20),
	profile_pic text
);

CREATE TABLE POSTS(
	id serial PRIMARY KEY NOT NULL,
	title varchar(45),
	img text,
	content text,
	author_id integer
);

ALTER TABLE users
    ALTER COLUMN password TYPE text;

-- add dummy data

insert into users (username, profile_pic)
values
('dummy','https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png');

insert into posts (title, img, content, author_id)
values
('first article','https://www.kindpng.com/picc/m/130-1300217_user-icon-member-icon-png-transparent-png.png', 'Lorem and something',1);
