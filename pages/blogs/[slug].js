function Blog({ blog }) {
  return (
    <div className="">
      <h1>Single Blog</h1>
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
