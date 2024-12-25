const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product"); // Подключаем модель

const app = express();
const PORT = 3000;

// Подключение к MongoDB
mongoose
  .connect("mongodb://localhost:27017/your_database", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

// Маршрут для поиска
app.get("/search", async (req, res) => {
  const query = req.query.q; // Получаем запрос из URL: /search?q=что_искать

  try {
    const results = await Product.find({ $text: { $search: query } });
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка поиска");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
