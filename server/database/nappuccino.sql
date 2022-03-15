
CREATE TABLE public.status (
                priviledge VARCHAR NOT NULL,
                CONSTRAINT privilege PRIMARY KEY (priviledge)
);


CREATE TABLE public.report_type (
                type VARCHAR NOT NULL,
                CONSTRAINT type PRIMARY KEY (type)
);


CREATE SEQUENCE public.staff_staff_id_seq;

CREATE TABLE public.staff (
                staff_id INTEGER NOT NULL DEFAULT nextval('public.staff_staff_id_seq'),
                name VARCHAR NOT NULL,
                first_name VARCHAR NOT NULL,
                office VARCHAR,
                mail VARCHAR,
                phone VARCHAR,
                CONSTRAINT staff_id PRIMARY KEY (staff_id)
);


ALTER SEQUENCE public.staff_staff_id_seq OWNED BY public.staff.staff_id;

CREATE SEQUENCE public.dispenser_dispenser_id_seq;

CREATE TABLE public.dispenser (
                dispenser_id INTEGER NOT NULL DEFAULT nextval('public.dispenser_dispenser_id_seq'),
                dispenser_type VARCHAR NOT NULL,
                dispenser_status VARCHAR NOT NULL,
                CONSTRAINT dispenser_id PRIMARY KEY (dispenser_id)
);


ALTER SEQUENCE public.dispenser_dispenser_id_seq OWNED BY public.dispenser.dispenser_id;

CREATE TABLE public.users (
                login_ecn VARCHAR NOT NULL,
                report_count INTEGER NOT NULL,
                priviledge VARCHAR NOT NULL,
                CONSTRAINT user_id PRIMARY KEY (login_ecn)
);


CREATE SEQUENCE public.report_dispenser_report_dispenser_id_seq;

CREATE TABLE public.report_dispenser (
                report_dispenser_id INTEGER NOT NULL DEFAULT nextval('public.report_dispenser_report_dispenser_id_seq'),
                date TIMESTAMP NOT NULL,
                comment VARCHAR,
                display BOOLEAN NOT NULL,
                reliability INTEGER DEFAULT 50 NOT NULL,
                login_ecn VARCHAR NOT NULL,
                type VARCHAR NOT NULL,
                dispenser_id INTEGER NOT NULL,
                CONSTRAINT report_dispenser_id PRIMARY KEY (report_dispenser_id)
);


ALTER SEQUENCE public.report_dispenser_report_dispenser_id_seq OWNED BY public.report_dispenser.report_dispenser_id;

CREATE SEQUENCE public.votes_vote_id_seq;

CREATE TABLE public.votes (
                vote_id INTEGER NOT NULL DEFAULT nextval('public.votes_vote_id_seq'),
                date TIMESTAMP NOT NULL,
                vote_type BOOLEAN NOT NULL,
                report_dispenser_id INTEGER NOT NULL,
                login_ecn VARCHAR NOT NULL,
                CONSTRAINT vote_id PRIMARY KEY (vote_id)
);


ALTER SEQUENCE public.votes_vote_id_seq OWNED BY public.votes.vote_id;

CREATE SEQUENCE public.issues_issue_id_seq;

CREATE TABLE public.issues (
                issue_id INTEGER NOT NULL DEFAULT nextval('public.issues_issue_id_seq'),
                message VARCHAR NOT NULL,
                login_ecn VARCHAR NOT NULL,
                CONSTRAINT issue_id PRIMARY KEY (issue_id)
);


ALTER SEQUENCE public.issues_issue_id_seq OWNED BY public.issues.issue_id;

CREATE SEQUENCE public.report_ru_report_ru_id_seq;

CREATE TABLE public.report_ru (
                report_ru_id INTEGER NOT NULL DEFAULT nextval('public.report_ru_report_ru_id_seq'),
                date TIMESTAMP NOT NULL,
                report_type VARCHAR NOT NULL,
                comment VARCHAR,
                validation_count INTEGER NOT NULL,
                login_ecn VARCHAR NOT NULL,
                CONSTRAINT report_ru_id PRIMARY KEY (report_ru_id)
);


ALTER SEQUENCE public.report_ru_report_ru_id_seq OWNED BY public.report_ru.report_ru_id;

ALTER TABLE public.users ADD CONSTRAINT status_users_fk
FOREIGN KEY (priviledge)
REFERENCES public.status (priviledge)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.report_dispenser ADD CONSTRAINT report_type_report_dispenser_fk
FOREIGN KEY (type)
REFERENCES public.report_type (type)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.report_dispenser ADD CONSTRAINT dispenser_report_dispenser_fk
FOREIGN KEY (dispenser_id)
REFERENCES public.dispenser (dispenser_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.report_ru ADD CONSTRAINT users_report_ru_fk
FOREIGN KEY (login_ecn)
REFERENCES public.users (login_ecn)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.issues ADD CONSTRAINT users_issues_fk
FOREIGN KEY (login_ecn)
REFERENCES public.users (login_ecn)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.report_dispenser ADD CONSTRAINT users_report_dispenser_fk
FOREIGN KEY (login_ecn)
REFERENCES public.users (login_ecn)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.votes ADD CONSTRAINT users_votes_fk
FOREIGN KEY (login_ecn)
REFERENCES public.users (login_ecn)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.votes ADD CONSTRAINT report_dispenser_votes_fk
FOREIGN KEY (report_dispenser_id)
REFERENCES public.report_dispenser (report_dispenser_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

GRANT SELECT ON TABLE public.dispenser TO api;
GRANT SELECT ON TABLE public.report_type TO api;
GRANT INSERT, SELECT, UPDATE ON TABLE public.report_dispenser TO api;
GRANT USAGE, SELECT ON SEQUENCE report_dispenser_report_dispenser_id_seq TO api;
GRANT SELECT ON TABLE public.status TO api;
GRANT SELECT, INSERT ON TABLE public.users TO api;
