--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: courses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.courses (
    id integer NOT NULL,
    name character varying NOT NULL,
    price double precision,
    content text NOT NULL,
    teacher_id integer NOT NULL,
    "active " integer,
    "created_at " timestamp with time zone DEFAULT now(),
    "updated_at " timestamp with time zone DEFAULT now(),
    description text
);


ALTER TABLE public.courses OWNER TO postgres;

--
-- Name: teacher; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.teacher (
    id integer NOT NULL,
    name character varying NOT NULL,
    bio text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at time with time zone DEFAULT now()
);


ALTER TABLE public.teacher OWNER TO postgres;

--
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.courses (id, name, price, content, teacher_id, "active ", "created_at ", "updated_at ", description) FROM stdin;
1	HTML CSS c╞í bß║ún	1200000	Content 1	1	2	2024-01-01 12:30:57.12729+07	2024-01-01 12:30:57.12729+07	\N
2	JS c╞í bß║ún	1500000	Content 2	1	1	2024-01-01 12:30:57.12729+07	2024-01-01 12:30:57.12729+07	\N
3	React JS	1600000	Content 3	2	1	2024-01-01 12:30:57.12729+07	2024-01-01 12:30:57.12729+07	\N
4	NextJS	2000000	Content 4	3	1	2024-01-01 12:30:57.12729+07	2024-01-01 12:30:57.12729+07	\N
5	Fullstack NodeJs	20000000	Content 5	3	2	2024-01-01 12:30:57.12729+07	2024-01-01 12:30:57.12729+07	\N
\.


--
-- Data for Name: teacher; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.teacher (id, name, bio, created_at, updated_at) FROM stdin;
1	Ho├áng An	Giß║úng Vi├¬n	2024-01-01 12:37:48.994444+07	12:37:48.994444+07
2	D╞░╞íng	Trß╗ú Giß║úng 1	2024-01-01 12:37:48.994444+07	12:37:48.994444+07
3	Nam	Trß╗ú Giß║úng 2	2024-01-01 12:37:48.994444+07	12:37:48.994444+07
\.


--
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);


--
-- Name: teacher teacher_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teacher
    ADD CONSTRAINT teacher_pkey PRIMARY KEY (id);


--
-- Name: courses courses_teacher_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_teacher_id_foreign FOREIGN KEY (teacher_id) REFERENCES public.teacher(id) NOT VALID;


--
-- PostgreSQL database dump complete
--

