
CREATE TABLE status (
                priviledge VARCHAR NOT NULL,
                CONSTRAINT privilege PRIMARY KEY (priviledge)
);


CREATE TABLE report_type (
                type VARCHAR NOT NULL,
                CONSTRAINT type PRIMARY KEY (type)
);


CREATE SEQUENCE staff_staff_id_seq;

CREATE TABLE staff (
                staff_id INTEGER NOT NULL DEFAULT nextval('staff_staff_id_seq'),
                name VARCHAR NOT NULL,
                first_name VARCHAR NOT NULL,
                office VARCHAR,
                mail VARCHAR,
                phone VARCHAR,
                CONSTRAINT staff_id PRIMARY KEY (staff_id)
);


ALTER SEQUENCE staff_staff_id_seq OWNED BY staff.staff_id;

CREATE SEQUENCE dispenser_dispenser_id_seq;

CREATE TABLE dispenser (
                dispenser_id INTEGER NOT NULL DEFAULT nextval('dispenser_dispenser_id_seq'),
                dispenser_type VARCHAR NOT NULL,
                dispenser_status VARCHAR NOT NULL,
                CONSTRAINT dispenser_id PRIMARY KEY (dispenser_id)
);


ALTER SEQUENCE dispenser_dispenser_id_seq OWNED BY dispenser.dispenser_id;

CREATE TABLE users (
                login_ecn VARCHAR NOT NULL,
                report_count INTEGER NOT NULL,
                priviledge VARCHAR NOT NULL,
                CONSTRAINT user_id PRIMARY KEY (login_ecn)
);


CREATE SEQUENCE report_dispenser_report_dispenser_id_seq;

CREATE TABLE report_dispenser (
                report_dispenser_id INTEGER NOT NULL DEFAULT nextval('report_dispenser_report_dispenser_id_seq'),
                date TIMESTAMP NOT NULL,
                comment VARCHAR,
                validation_count INTEGER NOT NULL,
                dispenser_id INTEGER NOT NULL,
                last_vote_date TIMESTAMP,
                last_vote_type BOOLEAN,
                login_ecn VARCHAR NOT NULL,
                type VARCHAR NOT NULL,
                CONSTRAINT report_dispenser_id PRIMARY KEY (report_dispenser_id)
);


ALTER SEQUENCE report_dispenser_report_dispenser_id_seq OWNED BY report_dispenser.report_dispenser_id;

CREATE SEQUENCE issues_issue_id_seq;

CREATE TABLE issues (
                issue_id INTEGER NOT NULL DEFAULT nextval('issues_issue_id_seq'),
                message VARCHAR NOT NULL,
                login_ecn VARCHAR NOT NULL,
                CONSTRAINT issue_id PRIMARY KEY (issue_id)
);


ALTER SEQUENCE issues_issue_id_seq OWNED BY issues.issue_id;

CREATE SEQUENCE report_ru_report_ru_id_seq;

CREATE TABLE report_ru (
                report_ru_id INTEGER NOT NULL DEFAULT nextval('report_ru_report_ru_id_seq'),
                date TIMESTAMP NOT NULL,
                report_type VARCHAR NOT NULL,
                comment VARCHAR,
                validation_count INTEGER NOT NULL,
                login_ecn VARCHAR NOT NULL,
                CONSTRAINT report_ru_id PRIMARY KEY (report_ru_id)
);


ALTER SEQUENCE report_ru_report_ru_id_seq OWNED BY report_ru.report_ru_id;

ALTER TABLE users ADD CONSTRAINT status_users_fk
FOREIGN KEY (priviledge)
REFERENCES status (priviledge)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE report_dispenser ADD CONSTRAINT report_type_report_dispenser_fk
FOREIGN KEY (type)
REFERENCES report_type (type)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE report_dispenser ADD CONSTRAINT dispenser_report_dispenser_fk
FOREIGN KEY (dispenser_id)
REFERENCES dispenser (dispenser_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE report_ru ADD CONSTRAINT users_report_ru_fk
FOREIGN KEY (login_ecn)
REFERENCES users (login_ecn)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE issues ADD CONSTRAINT users_issues_fk
FOREIGN KEY (login_ecn)
REFERENCES users (login_ecn)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE report_dispenser ADD CONSTRAINT users_report_dispenser_fk
FOREIGN KEY (login_ecn)
REFERENCES users (login_ecn)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;