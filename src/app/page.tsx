// app/page.tsx

import { LikeButton } from "@/components/LikeButton";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-96">
        <LikeButton />
      </div>
    </div>
  );
}
