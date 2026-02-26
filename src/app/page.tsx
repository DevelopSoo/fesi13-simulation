// src/app/page.tsx

'use client';

import * as Sentry from '@sentry/nextjs';

export default function Home() {
  return (
    <div>
      <h1>Sentry 알림 테스트</h1>
      <button
        className="rounded-md bg-red-500 p-2 text-white"
        onClick={() => {
          Sentry.captureException(new EvalError('Eval Error'));
        }}
      >
        에러 발생
      </button>
    </div>
  );
}
