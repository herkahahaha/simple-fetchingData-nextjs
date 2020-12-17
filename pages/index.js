import Link from "next/Link";

function Index() {
  return (
    <div className="">
      <h1>Haii</h1>
      <Link href="/blogs">
        <a>Kesini aja Bang</a>
      </Link>
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

export default Index;
