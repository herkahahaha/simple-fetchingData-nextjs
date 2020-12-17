// node server/index.js ==> menjalankan server

const express = require("express");
const app = express();

// fake Data
const DATA_BLOGS = {
  "judul-1": {
    slug: "judul-1",
    title: "blog 1 cuuy",
    description: "yaa begitulah sodara-sodara",
  },
  "judul-2": {
    slug: "judul-2",
    title: "blog 2 cuuy",
    description: "yaa beginilah sodara-sodara",
  },
};

// run server
const PORT = 3002;
app.listen(PORT, () => {
  console.log("ruun roger has comming");
});

// add routes
app.get("/api/blogs/", (req, res) => {
  const mappedData = Object.keys(DATA_BLOGS).map((id) => DATA_BLOGS[id]);
  res.json(mappedData);
});

// route for single page
app.get("/api/blogs/:slug", (req, res) => {
  const { slug } = req.params;
  res.json(DATA_BLOGS[slug]);
});
