// src/app/page.tsx

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold">게시글 목록</h1>
      <p>환경: {process.env.NEXT_PUBLIC_MY_ENVIRONMENT}</p>
    </div>
  );
}
