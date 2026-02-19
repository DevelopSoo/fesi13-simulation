// src/components/SignupForm/index.tsx

export default function SignupForm() {
  return (
    <div className="w-full max-w-sm">
      <h1 className="mb-4 text-center text-2xl font-bold">회원가입</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            className="h-12 w-full rounded-lg border border-gray-300 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            type="email"
            placeholder="이메일"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            className="h-12 w-full rounded-lg border border-gray-300 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            type="password"
            placeholder="비밀번호"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="passwordConfirm">비밀번호 확인</label>
          <input
            id="passwordConfirm"
            className="h-12 w-full rounded-lg border border-gray-300 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            type="password"
            placeholder="비밀번호 확인"
          />
        </div>
        <button
          className="h-12 w-full rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          type="submit"
        >
          회원가입
        </button>
      </form>
    </div>
  );
}
