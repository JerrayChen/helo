INSERT INTO USERS (username, password, profile_pic)
values($1,$2,$3)
returning *;