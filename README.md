# EDISI GABUT JUMAT MALAM

## Penggunaan sederhana Data Fetching di Nextjs

> menggunakaan custom server

## Menambahkan Server

- tambahkan package `express` pada depedency yang kita gunakan, berikut ini contoh sederhananya
- buat folder `server/index.js`
- jalankan terminal dengan perintah `node server/index.js` untuk memastikan bekerja..
- cek di `http://localhost:3002/api/blogs`melihat data api kita

```javascript
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
```

<hr />

## Tampilan data

- berikut tampilkan seluruh data yang kita punya pada folder `pages/blogs/index.js`

```javascript
import Link from "next/Link";

function Blogs({ blogs }) {
  return (
    <div className="">
      <h1>Blogs</h1>
      <ul>
        {blogs.map((blog) => (
          <Link href={`blogs/${blog.slug}`}>
            <div key={blog.slug}>
              <li>{blog.title}</li>
              <p>{blog.description}</p>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
}

// add getStaticProps to get the data

export async function getStaticProps() {
  // get the respons from api
  const res = await fetch("http://localhost:3002/api/blogs/");
  const blogs = await res.json();
  return {
    props: { blogs },
  };
}

export default Blogs;
```

- Membuat sigle page buat spesifik data di dalam folder `pages/blogs/[slug].js`

```javascript
function Blog({ blog }) {
  return (
    <div className="">
      <h1>Jomblo Blog</h1>
      <p>{blog.description}</p>
    </div>
  );
}

// add getStaticProps to get the data

export async function getStaticProps({ params }) {
  // get the respons
  const res = await fetch(`http://localhost:3002/api/blogs/${params.slug}`);
  const blog = await res.json();
  return {
    props: { blog },
  };
}

// add getStaticPath te redirect specific data

export async function getStaticPaths() {
  const res = await fetch("http://localhost:3002/api/blogs/");
  const blogs = await res.json();
  const paths = await blogs.map((blog) => {
    return {
      params: {
        slug: `${blog.slug}`,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export default Blog;
```

> Terkadang lupa dan terbalik antara `getStaticProps` dan `getStaticPaths` pakek esssss yeee

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
