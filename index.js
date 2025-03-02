import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const { SERVER_PORT, CORS_ORIGIN } = process.env;

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});
