// src/components/ProductItem/index.tsx

interface ProductItemProps {
  title: string;
  description: string;
  // 품절 여부
  isSoldOut?: boolean;
}

export default function ProductItem({
  title,
  description,
  isSoldOut = false,
}: ProductItemProps) {
  return (
    <div className="mx-auto my-5 max-w-2xl p-5">
      <div className="flex gap-5 rounded-lg border border-gray-300 bg-white p-5">
        {/* 좌측: 상품 이미지 (회색 사각형) */}
        <div className="h-44 w-44 shrink-0 rounded bg-gray-400"></div>

        {/* 우측: 상품 정보 */}
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex-1">
            <h3 className="mb-2 text-lg font-semibold text-gray-800">
              {title}
            </h3>
            <p className="m-0 text-sm leading-relaxed text-gray-600">
              {description}
            </p>
          </div>

          {/* 상품 개수 조절 */}
          <div className="flex items-center gap-3">
            {isSoldOut ? (
              <span className="h-8 w-26 text-red-500">품절</span>
            ) : (
              <>
                <button className="flex h-8 w-8 cursor-pointer items-center justify-center rounded border border-gray-300 bg-white text-lg hover:bg-gray-100">
                  -
                </button>
                <span className="min-w-10 text-center text-base font-medium">
                  1
                </span>
                <button className="flex h-8 w-8 cursor-pointer items-center justify-center rounded border border-gray-300 bg-white text-lg hover:bg-gray-100">
                  +
                </button>
              </>
            )}
          </div>

          {/* 구매하기 버튼 */}
          <button
            disabled={isSoldOut}
            className={`${isSoldOut ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-blue-700"} w-full rounded border-0 bg-blue-600 py-3 text-base font-semibold text-white`}
          >
            구매하기
          </button>
        </div>
      </div>
    </div>
  );
}
