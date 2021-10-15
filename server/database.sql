-- Descargar extensión para la función uuid:
-- create extension if not exists "uuid-ossp"
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_lastname VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

-- Información de relleno
INSERT INTO users (user_name,user_lastname,user_email,user_password)
VALUES ('Juan','Pérez','juanp@mara.com','jper123032');