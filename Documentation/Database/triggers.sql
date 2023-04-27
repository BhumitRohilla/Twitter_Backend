CREATE OR REPLACE FUNCTION insertFunctionAfter()
  RETURNS TRIGGER 
  LANGUAGE PLPGSQL
  AS
$$
DECLARE
    last_id INTEGER;
BEGIN
    last_id := new.t_id;
    RAISE NOTICE 'Last ID: %', last_id;
    RETURN NEW;
END;
$$


create or replace trigger insertTriggerAfter after insert on Tweets for each row
	EXECUTE procedure insertFunctionAfter();