// import Head from 'next/head'
// import styles from '../styles/Home.module.css'
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
  // get the respons
  const res = await fetch("http://localhost:3002/api/blogs/");
  const blogs = await res.json();
  return {
    props: { blogs },
  };
}

export default Blogs;
