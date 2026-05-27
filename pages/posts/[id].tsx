import Container from "@components/elements/Container";
import StepsChart from "@components/StepsChart";
import VO2MaxChart from "@components/VO2MaxChart";
import CaloriesChart from "@components/CaloriesChart";

import { format } from "date-fns";
import markdownToHtml from "@lib/markdownToHtml";
import { PostData, getAllPosts, getPostData } from "@lib/posts";
import { InferGetStaticPropsType } from "next";

const Post = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!post?.id) {
    return <Container>Nothing found here!</Container>
  }

  return (
    <Container>
      <article>
        <header>
          <h1 className="text-3xl font-bold">{post.title}</h1>
          {post.excerpt ? (
            <p className="mt-2 text-xl">{post.excerpt}</p>
          ) : null}
          <time className="flex mt-2 text-gray-400">
            {format(new Date(post.date + "T00:00:00"), "MMMM d, yyyy")}
          </time>
        </header>

        <div
          className="prose mt-4"
          dangerouslySetInnerHTML={{ __html: post.content || '' }}
        />

        {post.id === 'i-walked-20000-steps-a-day-for-3-months' && (
          <>
            <h3 className="text-xl font-bold mt-10">Step Counts</h3>
            <StepsChart />
            <h3 className="text-xl font-bold mt-10">VO2 Max</h3>
            <VO2MaxChart />
            <h3 className="text-xl font-bold mt-10">Daily Calories Burned</h3>
            <CaloriesChart />
          </>
        )}
      </article>
    </Container>
  )
}

export default Post;

export async function getStaticPaths() {
  const postIds = getAllPosts().map(({ id }) => id);
  return {
    paths: postIds.map((id) => ({
      params: { id },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }): Promise<{ props: { post: PostData } }> {
  const post = getPostData(params.id)
  const content = await markdownToHtml(post.content || '')
  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}