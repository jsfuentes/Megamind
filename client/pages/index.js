import Head from "next/head";
import Layout, { siteTitle } from "../layouts/layout";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/Date";
import { frontMatter as introData } from "./docs/intro.mdx";
import { frontMatter as advancedData } from "./docs/advanced.mdx";

export default function Home({ allPostsData }) {
  const docsPages = [introData, advancedData];

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="w-full h-full flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold">Blog</h2>
        <ul>
          {docsPages.map((page) => (
            <li key={page.__resourcePath}>
              <Link href={formatPath(page.__resourcePath)}>
                <a>{page.title}</a>
              </Link>
            </li>
          ))}
        </ul>
        <ul>
          {allPostsData.map(({ id, date, title }) => (
            <li key={id}>
              <Link href="/posts/[id]" as={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className="font-light">
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

function formatPath(p) {
  return p.replace(/\.mdx$/, "");
}
