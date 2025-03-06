import express from "express";
import userRoutes from "./users/routers/users";
import chapterRoutes from "./chapters/routers/chapterRoutes";
import bookRoutes from "./books/routers/bookRoutes";
import writerSubsRoutes from "./subscriptions/routers/writerSubsRoutes";
import bookSubsRoutes from "./subscriptions/routers/bookSubsRoutes";
import genersRoutes from "./geners/routers/genres";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/books", bookRoutes);
app.use("/chapters", chapterRoutes);
app.use("/writerSub", writerSubsRoutes);
app.use("/bookSub", bookSubsRoutes);
app.use("/genres", genersRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
