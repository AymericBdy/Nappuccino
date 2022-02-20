
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

CREATE SEQUENCE public.users_user_id_seq;

CREATE TABLE public.users (
                user_id INTEGER NOT NULL DEFAULT nextval('public.users_user_id_seq'),
                report_count INTEGER NOT NULL,
                status VARCHAR,
                CONSTRAINT user_id PRIMARY KEY (user_id)
);


ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;

CREATE TABLE public.user_ecn (
                login_ecn VARCHAR NOT NULL,
                user_id INTEGER NOT NULL,
                CONSTRAINT login_ecn PRIMARY KEY (login_ecn)
);


CREATE SEQUENCE public.issues_issue_id_seq;

CREATE TABLE public.issues (
                issue_id INTEGER NOT NULL DEFAULT nextval('public.issues_issue_id_seq'),
                login_ecn VARCHAR NOT NULL,
                message VARCHAR NOT NULL,
                CONSTRAINT issue_id PRIMARY KEY (issue_id)
);


ALTER SEQUENCE public.issues_issue_id_seq OWNED BY public.issues.issue_id;

CREATE SEQUENCE public.report_dispenser_report_dispenser_id_seq;

CREATE TABLE public.report_dispenser (
                report_dispenser_id INTEGER NOT NULL DEFAULT nextval('public.report_dispenser_report_dispenser_id_seq'),
                date TIMESTAMP NOT NULL,
                report_type VARCHAR NOT NULL,
                comment VARCHAR,
                validation_count INTEGER NOT NULL,
                dispenser_id INTEGER NOT NULL,
                login_ecn VARCHAR NOT NULL,
                CONSTRAINT report_dispenser_id PRIMARY KEY (report_dispenser_id)
);


ALTER SEQUENCE public.report_dispenser_report_dispenser_id_seq OWNED BY public.report_dispenser.report_dispenser_id;

CREATE SEQUENCE public.report_ru_report_ru_id_seq;

CREATE TABLE public.report_ru (
                report_ru_id INTEGER NOT NULL DEFAULT nextval('public.report_ru_report_ru_id_seq'),
                date TIMESTAMP NOT NULL,
                report_type VARCHAR NOT NULL,
                comment VARCHAR,
                user_id INTEGER NOT NULL,
                validation_count INTEGER NOT NULL,
                login_ecn VARCHAR NOT NULL,
                CONSTRAINT report_ru_id PRIMARY KEY (report_ru_id)
);


ALTER SEQUENCE public.report_ru_report_ru_id_seq OWNED BY public.report_ru.report_ru_id;

ALTER TABLE public.report_dispenser ADD CONSTRAINT dispenser_report_dispenser_fk
FOREIGN KEY (dispenser_id)
REFERENCES public.dispenser (dispenser_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.user_ecn ADD CONSTRAINT users_user_ecn_fk
FOREIGN KEY (user_id)
REFERENCES public.users (user_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.report_ru ADD CONSTRAINT user_ecn_report_ru_fk
FOREIGN KEY (login_ecn)
REFERENCES public.user_ecn (login_ecn)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.report_dispenser ADD CONSTRAINT user_ecn_report_dispenser_fk
FOREIGN KEY (login_ecn)
REFERENCES public.user_ecn (login_ecn)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.issues ADD CONSTRAINT user_ecn_issues_fk
FOREIGN KEY (login_ecn)
REFERENCES public.user_ecn (login_ecn)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;