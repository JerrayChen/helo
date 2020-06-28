select p.title, p.img, p.content, 
u.username author, u.profile_pic authorPicture, u.id authorId 
from posts p
inner join users u
on u.id = p.author_id
where p.id = $1