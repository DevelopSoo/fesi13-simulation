// app/posts/[id]/page.tsx
import { Metadata } from "next";
import { cache } from "react";

type Props = {
  params: Promise<{ id: string }>;
};

const getPost = cache(async (id: string) => {
  console.log("api 호출");
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
  );
  const post = await response.json();

  return post;
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);
  return {
    title: `게시글 | ${post.title}`,
    description: post.body,
  };
}

export default async function PostPage({ params }: Props) {
  const { id } = await params;
  const post = await getPost(id);

  return (
    <div>
      <h1 className="text-2xl font-bold">제목: {post.title}</h1>
      <p className="text-gray-500">내용: {post.body}</p>
    </div>
  );
}
