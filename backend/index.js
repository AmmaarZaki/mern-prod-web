import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js"
import productRoutes from "./routes/product.route.js"
import path from "path"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json());
app.use("/api", productRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (request, response) => {
        response.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at port: localhost:" + PORT);
});