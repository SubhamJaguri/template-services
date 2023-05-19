CREATE TABLE IF NOT EXISTS main.users
(
    id uuid NOT NULL DEFAULT (md5(((random())::text || (clock_timestamp())::text)))::uuid,
    username character varying NOT NULL,
    password character varying NOT NULL,
    CONSTRAINT pk_user_id PRIMARY KEY (id)
);
