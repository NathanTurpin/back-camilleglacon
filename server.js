const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");
const { Client } = require("@notionhq/client");
dotenv.config();
const notion = new Client({ auth: process.env.NOTION_KEY });
const app = express();
const port = process.env.PORT || 3000;
const databaseId = process.env.NOTION_PROJET_DB_ID;
app.use(express.json()).use(cors());

// Endpoint pour récupérer des données depuis Notion
app.get("/db", async (req, res) => {
  try {
    const lastOrderedIn2023 = await notion.databases.query({
      database_id: databaseId,
    });
    res.json(lastOrderedIn2023);
  } catch (error) {
    console.error("Erreur lors de la récupération des données Notion :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des données Notion." });
  }
});

// Endpoint pour récupérer des données depuis Notion
// app.get("/db", async (req, res) => {
//   try {
//     const response = await axios.get(
//       "https://api.notion.com/v1/databases/69beb60018a04dc4a85f568bbd03dc94",
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.NOTION_KEY}`,
//           "Notion-Version": "2021-08-16", // Remplacez par la version de l'API Notion que vous utilisez
//         },
//       }
//     );

//     const data = response.data;
//     res.json(data.results);
//   } catch (error) {
//     console.error("Erreur lors de la récupération des données Notion :", error);
//     res
//       .status(500)
//       .json({ error: "Erreur lors de la récupération des données Notion." });
//   }
// });

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
