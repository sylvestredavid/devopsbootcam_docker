create table products
(
    id        uuid not null
        constraint products_pk
            primary key,
    name      varchar,
    image_url text,
    price     integer
);