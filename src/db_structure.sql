CREATE DATABASE IF NOT EXISTS books;
USE books;

-- Nuevas tablas
DROP TABLE IF EXISTS user_fav_genres;
DROP TABLE IF EXISTS chapters_likes;
DROP TABLE IF EXISTS user_subscriptions;
DROP TABLE IF EXISTS likes;
DROP TABLE IF EXISTS book_genres;
DROP TABLE IF EXISTS chapters;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS genres;
DROP TABLE IF EXISTS users;

-- Tabla de usuarios
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    firebase_token VARCHAR(255)
);

-- Tabla principal de "libros" (antes 'stories')
CREATE TABLE books (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    author_id BIGINT,
    CONSTRAINT fk_books_author
        FOREIGN KEY (author_id) REFERENCES users(id)
        ON DELETE CASCADE
);

-- Tabla de géneros
CREATE TABLE genres (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- Tabla intermedia para asociar libros y géneros
CREATE TABLE book_genres (
    book_id BIGINT,
    genre_id BIGINT,
    PRIMARY KEY (book_id, genre_id),
    CONSTRAINT fk_book_genres_book
        FOREIGN KEY (book_id) REFERENCES books(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_book_genres_genre
        FOREIGN KEY (genre_id) REFERENCES genres(id)
        ON DELETE CASCADE
);

-- Tabla de capítulos
CREATE TABLE chapters (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    book_id BIGINT,
    CONSTRAINT fk_chapters_book
        FOREIGN KEY (book_id) REFERENCES books(id)
        ON DELETE CASCADE
);

-- Tabla de "me gusta" a libros
CREATE TABLE likes (
    user_id BIGINT,
    book_id BIGINT,
    PRIMARY KEY (user_id, book_id),
    CONSTRAINT fk_likes_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_likes_book
        FOREIGN KEY (book_id) REFERENCES books(id)
        ON DELETE CASCADE
);

-- 4.1) Tabla de suscripciones de usuario (followers)
--     user_id: el usuario que es seguido
--     follower_id: el usuario que sigue
CREATE TABLE user_subscriptions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    follower_id BIGINT NOT NULL,
    CONSTRAINT fk_user_subscriptions_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_user_subscriptions_follower
        FOREIGN KEY (follower_id) REFERENCES users(id)
        ON DELETE CASCADE
);

-- 4.2) Tabla de "me gusta" a capítulos
CREATE TABLE chapters_likes (
    user_id BIGINT,
    chapter_id BIGINT,
    PRIMARY KEY (user_id, chapter_id),
    CONSTRAINT fk_chapters_likes_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_chapters_likes_chapter
        FOREIGN KEY (chapter_id) REFERENCES chapters(id)
        ON DELETE CASCADE
);

-- 4.3) Tabla para géneros favoritos de cada usuario
CREATE TABLE user_fav_genres (
    user_id BIGINT,
    genre_id BIGINT,
    PRIMARY KEY (user_id, genre_id),
    CONSTRAINT fk_user_fav_genres_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_user_fav_genres_genre
        FOREIGN KEY (genre_id) REFERENCES genres(id)
        ON DELETE CASCADE
);

DELIMITER $$

CREATE PROCEDURE create_user (
    IN _username VARCHAR(255),
    IN _email VARCHAR(255),
    IN _password_hash VARCHAR(255),
    IN _firebase_token VARCHAR(255)
)
BEGIN
    INSERT INTO Ls (username, email, password_hash, firebase_token)
    VALUES (_username, _email, _password_hash, _firebase_token);
    SELECT LAST_INSERT_ID() AS inserted_id;
END$$

CREATE PROCEDURE get_user_by_id (
    IN _id BIGINT
)
BEGIN
    SELECT id, username, email, created_at, firebase_token
    FROM users
    WHERE id = _id;
END$$

CREATE PROCEDURE update_user (
    IN _id BIGINT,
    IN _username VARCHAR(255),
    IN _email VARCHAR(255),
    IN _password_hash VARCHAR(255),
    IN _firebase_token VARCHAR(255)
)
BEGIN
    UPDATE users
    SET
        username      = _username,
        email         = _email,
        password_hash = _password_hash,
        firebase_token = _firebase_token
    WHERE id = _id;
END$$

CREATE PROCEDURE delete_user (
    IN _id BIGINT
)
BEGIN
    DELETE FROM users
    WHERE id = _id;
END$$

---------------------------
--         BOOKS
---------------------------
CREATE PROCEDURE create_book (
    IN _title TEXT,
    IN _description TEXT,
    IN _author_id BIGINT
)
BEGIN
    INSERT INTO books (title, description, author_id)
    VALUES (_title, _description, _author_id);
    SELECT LAST_INSERT_ID() AS inserted_id;
END$$

CREATE PROCEDURE get_books_by_author (
    IN _author_id BIGINT
)
BEGIN
    SELECT id, title, description, created_at
    FROM books
    WHERE author_id = _author_id;
END$$

CREATE PROCEDURE update_book (
    IN _id BIGINT,
    IN _title TEXT,
    IN _description TEXT
)
BEGIN
    UPDATE books
    SET
        title       = _title,
        description = _description
    WHERE id = _id;
END$$

CREATE PROCEDURE delete_book (
    IN _id BIGINT
)
BEGIN
    DELETE FROM books
    WHERE id = _id;
END$$

---------------------------
--       CHAPTERS
---------------------------
CREATE PROCEDURE create_chapter (
    IN _title TEXT,
    IN _content TEXT,
    IN _book_id BIGINT
)
BEGIN
    INSERT INTO chapters (title, content, book_id)
    VALUES (_title, _content, _book_id);
    SELECT LAST_INSERT_ID() AS inserted_id;
END$$

CREATE PROCEDURE get_chapters_by_book (
    IN _book_id BIGINT
)
BEGIN
    SELECT id, title, content, created_at
    FROM chapters
    WHERE book_id = _book_id;
END$$

CREATE PROCEDURE update_chapter (
    IN _id BIGINT,
    IN _title TEXT,
    IN _content TEXT
)
BEGIN
    UPDATE chapters
    SET
        title = _title,
        content = _content
    WHERE id = _id;
END$$

CREATE PROCEDURE delete_chapter (
    IN _id BIGINT
)
BEGIN
    DELETE FROM chapters
    WHERE id = _id;
END$$

---------------------------
--        LIKES (libros)
---------------------------
CREATE PROCEDURE add_like (
    IN _user_id BIGINT,
    IN _book_id BIGINT
)
BEGIN
    INSERT INTO likes (user_id, book_id)
    VALUES (_user_id, _book_id);
END$$

CREATE PROCEDURE remove_like (
    IN _user_id BIGINT,
    IN _book_id BIGINT
)
BEGIN
    DELETE FROM likes
    WHERE user_id = _user_id
      AND book_id = _book_id;
END$$

CREATE PROCEDURE get_likes_by_book (
    IN _book_id BIGINT
)
BEGIN
    SELECT user_id
    FROM likes
    WHERE book_id = _book_id;
END$$

---------------------------
--        GENRES
---------------------------
CREATE PROCEDURE create_genre (
    IN _name VARCHAR(255)
)
BEGIN
    INSERT INTO genres (name)
    VALUES (_name);
    SELECT LAST_INSERT_ID() AS inserted_id;
END$$

CREATE PROCEDURE get_all_genres ()
BEGIN
    SELECT id, name
    FROM genres;
END$$

CREATE PROCEDURE update_genre (
    IN _id BIGINT,
    IN _name VARCHAR(255)
)
BEGIN
    UPDATE genres
    SET name = _name
    WHERE id = _id;
END$$

CREATE PROCEDURE get_books_by_genre (
    IN _genre_id BIGINT
)
BEGIN
    SELECT b.id, b.title, b.description, b.created_at
    FROM books b
    INNER JOIN book_genres bg ON b.id = bg.book_id
    WHERE bg.genre_id = _genre_id;
END$$

DELIMITER ;
