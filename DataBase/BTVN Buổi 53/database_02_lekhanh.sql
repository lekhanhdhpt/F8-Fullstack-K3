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
-- Name: Order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Order" (
    id integer NOT NULL,
    customers_id integer NOT NULL,
    product_quantity integer NOT NULL,
    status character varying,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public."Order" OWNER TO postgres;

--
-- Name: customers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customers (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    phone_number numeric(15,0),
    password character varying,
    created_at time with time zone DEFAULT now(),
    updated_at time with time zone DEFAULT now()
);


ALTER TABLE public.customers OWNER TO postgres;

--
-- Name: customers_info; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customers_info (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    phone_number character varying(15) NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.customers_info OWNER TO postgres;

--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    price money NOT NULL,
    "description " text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: products_info; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products_info (
    id integer NOT NULL,
    products_id integer NOT NULL,
    order_id integer NOT NULL,
    quantity integer,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.products_info OWNER TO postgres;

--
-- Data for Name: Order; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Order" (id, customers_id, product_quantity, status, created_at, updated_at) FROM stdin;
1	1	2	Shipping	2024-01-08 13:02:32.056265+07	2024-01-08 13:02:32.056265+07
2	2	2	Checked	2024-01-08 13:02:32.056265+07	2024-01-08 13:02:32.056265+07
\.


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customers (id, name, email, phone_number, password, created_at, updated_at) FROM stdin;
1	Lê Khánh	lekhanh@gmail.com	869392196	123456	12:54:26.873943+07	12:54:26.873943+07
2	Khánh Lê	khanhle@gmail.com	869392169	18102002	12:54:26.873943+07	12:54:26.873943+07
3	Quốc Khánh	quockhanh@gmail.com	896392196	234111333	12:54:26.873943+07	12:54:26.873943+07
\.


--
-- Data for Name: customers_info; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customers_info (id, name, email, phone_number, created_at, updated_at) FROM stdin;
1	Lê Khánh	lekhanh@gmail.com	0869392196	2024-01-08 12:56:29.308952+07	2024-01-08 12:56:29.308952+07
2	Khánh Lê	khanhle@gmail.com	0869392169	2024-01-08 12:56:29.308952+07	2024-01-08 12:56:29.308952+07
3	Quốc Khánh	quockhanh@gmail.com	0896392196	2024-01-08 12:56:29.308952+07	2024-01-08 12:56:29.308952+07
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name, price, "description ", created_at, updated_at) FROM stdin;
1	Quần đùi thái	$30,000.00	Xấu điên	2024-01-08 12:59:18.543998+07	2024-01-08 12:59:18.543998+07
2	Áo adidas	$100,000.00	Tạm được	2024-01-08 12:59:18.543998+07	2024-01-08 12:59:18.543998+07
3	Quần đôn chề	$150,000.00	Bảnh	2024-01-08 12:59:18.543998+07	2024-01-08 12:59:18.543998+07
4	Áo gà nướng giấy bạc	$125,000.00	Mặc là được cơ động theo 	2024-01-08 12:59:18.543998+07	2024-01-08 12:59:18.543998+07
\.


--
-- Data for Name: products_info; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products_info (id, products_id, order_id, quantity, created_at, updated_at) FROM stdin;
2	2	2	2	2024-01-08 12:56:56.486954+07	2024-01-08 12:56:56.486954+07
1	1	1	1	2024-01-08 12:56:56.486954+07	2024-01-08 12:56:56.486954+07
3	3	1	1	2024-01-08 12:56:56.486954+07	2024-01-08 12:56:56.486954+07
4	4	2	1	2024-01-08 12:56:56.486954+07	2024-01-08 12:56:56.486954+07
\.


--
-- Name: Order Order_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY (id);


--
-- Name: customers_info customers_info_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers_info
    ADD CONSTRAINT customers_info_pkey PRIMARY KEY (id);


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- Name: products_info products_info_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_info
    ADD CONSTRAINT products_info_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: Order customer_id_foreign_key; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT customer_id_foreign_key FOREIGN KEY (customers_id) REFERENCES public.customers_info(id) NOT VALID;


--
-- Name: products_info order_id_foreign_key; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_info
    ADD CONSTRAINT order_id_foreign_key FOREIGN KEY (order_id) REFERENCES public."Order"(id) NOT VALID;


--
-- Name: products_info products_id_foreign_key; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products_info
    ADD CONSTRAINT products_id_foreign_key FOREIGN KEY (products_id) REFERENCES public.products(id) NOT VALID;


--
-- PostgreSQL database dump complete
--

