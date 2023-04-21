--User Table
create table users (u_id int primary key, userName varchar(30) not null, password varchar(50) not null, twitterBlue boolean not null, ProfilePicture varchar(30), headerPicture varchar(30), email varchar(40) not null);
--Bio Table
create table biodata (u_id int primary key , bio varchar(2000) , foreign key (u_id) references users(u_id));
--Follow Table
create table followTable (u_id int not null, follower int not null, foreign key (u_id) references users(u_id), foreign key (follower) references users(u_id));


------------------------------------------------------------------


