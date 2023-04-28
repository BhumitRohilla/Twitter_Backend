create or replace procedure likeHandle(tId int, uId int)
	language PLPGSQL
AS
$$
begin
	insert into likeTable values(tId,uId,'t');
	update tweets set likes = ((select likes from tweets where tweets.t_id = tId) + 1 ) where tweets.t_id = tId;
end;
$$


create or replace procedure removeLikeHandle(tId int, uId int)
	language PLPGSQL
AS
$$
begin
	delete from likeTable where t_id = tId and u_id = uId;
	update tweets set likes = ((select likes from tweets where tweets.t_id = tId) - 1 ) where tweets.t_id = tId;
end;
$$