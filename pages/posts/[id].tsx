import Container from "@components/elements/Container";
import distanceToNow from "@lib/dateRelative";
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
            {distanceToNow(new Date(post.date))}
          </time>
        </header>

        <div
          className="prose mt-10"
          dangerouslySetInnerHTML={{ __html: post.content || '' }}
        />
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