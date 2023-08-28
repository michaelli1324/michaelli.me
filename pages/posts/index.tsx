import Container from "@components/elements/Container";
import distanceToNow from "@lib/dateRelative";
import { getAllPosts } from "@lib/posts";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";

const Posts = ({ allPostsData }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Container>
      {allPostsData.length ? (allPostsData.map(({ id, excerpt, ...data }) => (
        <div key={id} className="mb-10">
          <Link
            href={`/posts/${id}`}
            className="text-lg leading-6 font-bold"
          >
            {data.title}
          </Link>
          <p>{excerpt}</p>
          <div className="text-gray-400">
            <time>{distanceToNow(new Date(data.date))}</time>
          </div>
        </div>
      ))) : (<p>No blog contents</p>)
      }
    </Container>
  );
}

export default Posts

export async function getStaticProps() {
  const allPostsData = getAllPosts();
  return {
    props: {
      allPostsData,
    },
  };
}