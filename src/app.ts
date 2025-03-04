import express from "express";
import userRoutes from "./users/routers/users";
import chapterRoutes from "./chapters/routers/chapterRoutes";
import bookRoutes from "./books/routers/bookRoutes";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/books", bookRoutes);
app.use("/chapters", chapterRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
