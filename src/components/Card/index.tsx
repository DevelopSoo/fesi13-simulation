// src/components/Card/index.tsx

import { cva } from "class-variance-authority";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const cardVariants = cva(
  // 기본 스타일 (항상 적용)
  "overflow-hidden transition-all max-w-md",
  {
    variants: {
      // variant 옵션들
      variant: {
        default: "bg-white border border-gray-200",
        outlined:
          "bg-white border border-gray-500 hover:border-gray-400 transition-colors",
        elevated: "bg-white shadow-lg hover:shadow-xl transition-shadow",
      },
      // padding 옵션들
      padding: {
        none: "p-0",
        sm: "p-3",
        md: "p-5",
        lg: "p-8",
      },
      // radius 옵션들
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
    },
    // 기본값 설정
    defaultVariants: {
      variant: "default",
      padding: "md",
      radius: "md",
    },
  },
);

type CardProps = {
  children: React.ReactNode;
  variant?: "default" | "outlined" | "elevated";
  padding?: "none" | "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  className?: string;
};

const Card = ({
  children,
  variant = "default",
  padding = "md",
  radius = "md",
  className,
}: CardProps) => {
  const cardClasses = twMerge(
    clsx(cardVariants({ variant, padding, radius, className })),
  );

  return <div className={cardClasses}>{children}</div>;
};

export default Card;
