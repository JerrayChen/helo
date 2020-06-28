select p.id, p.title, u.username author, u.profile_pic authorPic from posts p
inner join users u
on u.id = p.author_id
where p.title like $1
and (u.id != $2 or (u.id = $2 and $3));