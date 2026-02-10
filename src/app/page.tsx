"use client";

import Image from "next/image";
import dynamic from "next/dynamic";

const ThemeToggle = dynamic(() => import("@/components/ThemeToggle"), {
  ssr: false,
});

export default function Home() {
  const blogPosts = [
    {
      title: "첫 번째 블로그 포스트",
      description: "블로그 포스트 설명입니다.",
      date: "2024-03-20",
      imageUrl:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "두 번째 블로그 포스트",
      description: "블로그 포스트 설명입니다.",
      date: "2024-03-21",
      imageUrl:
        "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "세 번째 블로그 포스트",
      description: "블로그 포스트 설명입니다.",
      date: "2024-03-22",
      imageUrl:
        "https://images.unsplash.com/photo-1455894127589-22f75500213a?q=80&w=1987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "네 번째 블로그 포스트",
      description: "블로그 포스트 설명입니다.",
      date: "2024-03-23",
      imageUrl:
        "https://images.unsplash.com/photo-1589652717521-10c0d092dea9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "다섯 번째 블로그 포스트",
      description: "블로그 포스트 설명입니다.",
      date: "2024-03-24",
      imageUrl:
        "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "여섯 번째 블로그 포스트",
      description: "블로그 포스트 설명입니다.",
      date: "2024-03-25",
      imageUrl:
        "https://images.unsplash.com/photo-1522410818928-5522dacd5066?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <main className="mx-auto px-4 py-8 dark:bg-gray-900">
      <div className="mb-4 flex justify-end">
        <ThemeToggle />
      </div>
      <h1 className="mb-8 text-center text-4xl font-bold dark:text-white">
        나의 블로그
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl dark:bg-gray-800"
          >
            <Image
              width={500}
              height={500}
              src={post.imageUrl}
              alt={post.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-6">
              <h2 className="mb-2 text-xl font-semibold dark:text-white">
                {post.title}
              </h2>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                {post.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {post.date}
                </span>
                <button className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                  자세히 보기
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
