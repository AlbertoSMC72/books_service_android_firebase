-- Crear el esquema
CREATE SCHEMA IF NOT EXISTS books;

-- Crear la tabla de usuarios
CREATE TABLE books.users (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    firebase_token TEXT
);

-- Crear la tabla de historias
CREATE TABLE books.stories (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    author_id BIGINT REFERENCES books.users(id) ON DELETE CASCADE
);

-- Crear la tabla de géneros
CREATE TABLE books.genres (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL UNIQUE
);

-- Crear la tabla intermedia de historias y géneros
CREATE TABLE books.story_genres (
    story_id BIGINT REFERENCES books.stories(id) ON DELETE CASCADE,
    genre_id BIGINT REFERENCES books.genres(id) ON DELETE CASCADE,
    PRIMARY KEY (story_id, genre_id)
);

-- Crear la tabla de capítulos
CREATE TABLE books.chapters (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    story_id BIGINT REFERENCES books.stories(id) ON DELETE CASCADE
);

-- Crear la tabla de "me gusta"
CREATE TABLE books.likes (
    user_id BIGINT REFERENCES books.users(id) ON DELETE CASCADE,
    story_id BIGINT REFERENCES books.stories(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, story_id)
);

-- Procedimientos almacenados para CRUD en cada tabla

-- ! Procedimiento para insertar un usuario
CREATE OR REPLACE FUNCTION books.create_user(_username TEXT, _email TEXT, _password_hash TEXT, _firebase_token TEXT)
RETURNS BIGINT AS $$
DECLARE _id BIGINT;
BEGIN
    INSERT INTO books.users (username, email, password_hash, firebase_token)
    VALUES (_username, _email, _password_hash, _firebase_token)
    RETURNING id INTO _id;
    RETURN _id;
END;
$$ LANGUAGE plpgsql;

-- Procedimiento para obtener un usuario por ID
CREATE OR REPLACE FUNCTION books.get_user_by_id(_id BIGINT)
RETURNS TABLE (id BIGINT, username TEXT, email TEXT, created_at TIMESTAMP, firebase_token TEXT) AS $$
BEGIN
    RETURN QUERY SELECT u.id, u.username, u.email, u.created_at, u.firebase_token FROM books.users u WHERE u.id = _id;
END;
$$ LANGUAGE plpgsql;

-- Procedimiento para actualizar un usuario
CREATE OR REPLACE FUNCTION books.update_user(_id BIGINT, _username TEXT, _email TEXT, _password_hash TEXT, _firebase_token TEXT)
RETURNS VOID AS $$
BEGIN
    UPDATE books.users SET username = _username, email = _email, password_hash = _password_hash, firebase_token = _firebase_token WHERE id = _id;
END;
$$ LANGUAGE plpgsql;

-- Procedimiento para eliminar un usuario
CREATE OR REPLACE FUNCTION books.delete_user(_id BIGINT)
RETURNS VOID AS $$
BEGIN
    DELETE FROM books.users WHERE id = _id;
END;
$$ LANGUAGE plpgsql;

-- ! Procedimiento para insertar una historia
CREATE OR REPLACE FUNCTION books.create_story(_title TEXT, _description TEXT, _author_id BIGINT)
RETURNS BIGINT AS $$
DECLARE _id BIGINT;
BEGIN
    INSERT INTO books.stories (title, description, author_id)
    VALUES (_title, _description, _author_id)
    RETURNING id INTO _id;
    RETURN _id;
END;
$$ LANGUAGE plpgsql;

-- Procedimiento para obtener historias por autor
CREATE OR REPLACE FUNCTION books.get_stories_by_author(_author_id BIGINT)
RETURNS TABLE (id BIGINT, title TEXT, description TEXT, created_at TIMESTAMP) AS $$
BEGIN
    RETURN QUERY SELECT s.id, s.title, s.description, s.created_at FROM books.stories s WHERE s.author_id = _author_id;
END;
$$ LANGUAGE plpgsql;

-- Procedimiento para actualizar una historia
CREATE OR REPLACE FUNCTION books.update_story(_id BIGINT, _title TEXT, _description TEXT)
RETURNS VOID AS $$
BEGIN
    UPDATE books.stories SET title = _title, description = _description WHERE id = _id;
END;
$$ LANGUAGE plpgsql;

-- Procedimiento para eliminar una historia
CREATE OR REPLACE FUNCTION books.delete_story(_id BIGINT)
RETURNS VOID AS $$
BEGIN
    DELETE FROM books.stories WHERE id = _id;
END;
$$ LANGUAGE plpgsql;

-- ! Procedimiento para insertar un capítulo
CREATE OR REPLACE FUNCTION books.create_chapter(_title TEXT, _content TEXT, _story_id BIGINT)
RETURNS BIGINT AS $$
DECLARE _id BIGINT;
BEGIN
    INSERT INTO books.chapters (title, content, story_id)
    VALUES (_title, _content, _story_id)
    RETURNING id INTO _id;
    RETURN _id;
END;
$$ LANGUAGE plpgsql;

-- Procedimiento para obtener capítulos por historia
CREATE OR REPLACE FUNCTION books.get_chapters_by_story(_story_id BIGINT)
RETURNS TABLE (id BIGINT, title TEXT, content TEXT, created_at TIMESTAMP) AS $$
BEGIN
    RETURN QUERY SELECT c.id, c.title, c.content, c.created_at FROM books.chapters c WHERE c.story_id = _story_id;
END;
$$ LANGUAGE plpgsql;

-- Procedimiento para actualizar un capítulo
CREATE OR REPLACE FUNCTION books.update_chapter(_id BIGINT, _title TEXT, _content TEXT)
RETURNS VOID AS $$
BEGIN
    UPDATE books.chapters SET title = _title, content = _content WHERE id = _id;
END;
$$ LANGUAGE plpgsql;

-- Procedimiento para eliminar un capítulo
CREATE OR REPLACE FUNCTION books.delete_chapter(_id BIGINT)
RETURNS VOID AS $$
BEGIN
    DELETE FROM books.chapters WHERE id = _id;
END;
$$ LANGUAGE plpgsql;

-- ! Procedimientos para la tabla likes
CREATE OR REPLACE FUNCTION books.add_like(_user_id BIGINT, _story_id BIGINT)
RETURNS VOID AS $$
BEGIN
    INSERT INTO books.likes (user_id, story_id) VALUES (_user_id, _story_id);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION books.remove_like(_user_id BIGINT, _story_id BIGINT)
RETURNS VOID AS $$
BEGIN
    DELETE FROM books.likes WHERE user_id = _user_id AND story_id = _story_id;
END;
$$ LANGUAGE plpgsql;

-- Procedimiento para obtener los likes de una historia
CREATE OR REPLACE FUNCTION books.get_likes_by_story(_story_id BIGINT)
RETURNS TABLE (user_id BIGINT) AS $$
BEGIN
    RETURN QUERY SELECT l.user_id FROM books.likes l WHERE l.story_id = _story_id;
END;

-- ! Procedimientos para la tabla genres
CREATE OR REPLACE FUNCTION books.create_genre(_name TEXT)
RETURNS BIGINT AS $$
DECLARE _id BIGINT;
BEGIN
    INSERT INTO books.genres (name) VALUES (_name) RETURNING id INTO _id;
    RETURN _id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION books.get_all_genres()
RETURNS TABLE (id BIGINT, name TEXT) AS $$
BEGIN
    RETURN QUERY SELECT g.id, g.name FROM books.genres g;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION books.update_genre(_id BIGINT, _name TEXT)
RETURNS VOID AS $$
BEGIN
    UPDATE books.genres SET name = _name WHERE id = _id;
END;
$$ LANGUAGE plpgsql;

--libros por genero
CREATE OR REPLACE FUNCTION books.get_stories_by_genre(_genre_id BIGINT)
RETURNS TABLE (id BIGINT, title TEXT, description TEXT, created_at TIMESTAMP) AS $$
BEGIN
    RETURN QUERY SELECT s.id, s.title, s.description, s.created_at FROM books.stories s JOIN books.story_genres sg ON s.id = sg.story_id WHERE sg.genre_id = _genre_id;
END;
