import Hero from "../components/home-page/hero";
import FeaturedPosts from "../components/home-page/featured-posts";
import { getFeaturePosts } from "../lib/post-util";
import Head from "next/head";

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>Max&apos; Blog</title>
        <meta
          name="description"
          content="I post about programming and web development."
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </>
  );
};

export function getStaticProps() {
  const featurePosts = getFeaturePosts();

  return {
    props: {
      posts: featurePosts,
    },
    revalidate: 60,
  };
}

export default HomePage;

// 1) Hero => Present ourselves
// 2) Featured Posts
