import express from "express";
import userRoutes from "./users/routers/users";
import chapterRoutes from "./chapters/routers/chapterRoutes";
import bookRoutes from "./books/routers/bookRoutes";
import userLikesWritersRoutes from "./suscritions/routers/user_likes_writers";
import userLikesBooksRoutes from "./suscritions/routers/user_likes_books";
import genersRoutes from "./geners/routers/genres";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/books", bookRoutes);
app.use("/chapters", chapterRoutes);
app.use("/sub_writer", userLikesWritersRoutes);
app.use("/sub_book", userLikesBooksRoutes);
app.use("/genres", genersRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
