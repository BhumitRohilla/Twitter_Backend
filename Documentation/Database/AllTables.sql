--Users Table
create table
    users (
        u_id int primary key GENERATED BY DEFAULT AS IDENTITY (
            START
            WITH
                1 INCREMENT BY 1
        ),
        userName varchar(30) not null unique,
        password varchar(100) not null,
        twitterBlue boolean not null DEFAULT 'false',
        ProfilePicture varchar(100),
        headerPicture varchar(100),
        email varchar(40) not null unique,
        bio varchar(150) not null default ''
    );

--Follow Table
create table
    followTable (
        u_id int not null,
        follower int not null,
        foreign key (u_id) references users (u_id),
        foreign key (follower) references users (u_id)
    );

--Like Table
create table
    likeTable (
        t_id int not null,
        u_id int not null,
        liked boolean not null,
        foreign key (t_id) references tweets (t_id),
        foreign key (u_id) references users (u_id),
        primary key (t_id, u_id)
    );

------------------------------------------------------------------
--Tweets Table
create table
    tweets (
        t_id int primary key GENERATED BY DEFAULT AS IDENTITY (
            START
            WITH
                1 INCREMENT BY 1
        ),
        sender int not null,
        text varchar(300),
        img varchar(200),
        dateOfUpload timestamp not null,
        view int not null,
        likes int not null,
        retweet boolean not null,
        quote varchar(300),
        commentOf int,
        active boolean not null,
        foreign key (sender) references users (u_id),
        foreign key (commentOf) references tweets (t_id)
    );

--Mention Table
create table
    mentions (
        t_id int not null,
        u_id int not null,
        foreign key (t_id) references tweets (t_id),
        foreign key (u_id) references users (u_id)
    );

--Hash Table
create table
    hashtag (
        hashid int generated by default as identity (
            start
            with
                1 increment by 1
        ) primary key,
        text varchar(50) not null,
        count int default 0 not null
    );

--message Table
create table messages (
	convo_id int generated by default as identity(start with 1 increment by 1) not null primary key, 
	sender int not null references users(u_id),
	receiever int not null references users(u_id),
	message varchar(300) not null,
	timeofpost timestamp not null default current_timestamp
);