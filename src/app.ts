import express from "express";
import userRoutes from "./users/routers/users";
import userLikesWritersRoutes from "./suscritions/routers/user_likes_writers";
import userLikesBooksRoutes from "./suscritions/routers/user_likes_books";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/sub_writer", userLikesWritersRoutes);
app.use("/sub_book", userLikesBooksRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
