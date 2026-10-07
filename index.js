import express from "express";
import helmet from "helmet";

import loginRoutes from "./routes/login.js"
import watchlistRoutes from "./routes/watchlist.js"; //uncomment when files are made

const PORT = process.env.PORT;
const app = express();

app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Family Movie Watchlist API");
});

app.use("/api/auth", loginRoutes);

app.use("/api/watchlist", watchlistRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
