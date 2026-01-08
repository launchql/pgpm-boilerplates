-- ____moduleName____ extension SQL definitions

CREATE FUNCTION hello_____moduleName____()
RETURNS text
AS 'MODULE_PATHNAME'
LANGUAGE C IMMUTABLE STRICT;

COMMENT ON FUNCTION hello_____moduleName____() IS '____moduleDesc____';
