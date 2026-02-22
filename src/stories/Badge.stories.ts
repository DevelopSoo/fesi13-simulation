// src/stories/Badge.stories.ts

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Badge from "@/components/Badge";

const meta = {
  // Storybook 사이트의 사이드바에 표시되는 제목
  title: "Components/Badge",
  // 스토리북에서 사용할 컴포넌트
  component: Badge,
  // 컴포넌트가 표시되는 위치
  parameters: {
    layout: "centered",
  },
  // 컴포넌트 문서 자동 생성
  tags: ["autodocs"],
} satisfies Meta<typeof Badge>;

// meta 내보내기
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "md",
    colorPalette: "gray",
    children: "배지 내용",
  },
};

export const XSmall: Story = {
  args: {
    size: "xs",
    colorPalette: "gray",
    children: "배지 내용",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    colorPalette: "gray",
    children: "배지 내용",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    colorPalette: "gray",
    children: "배지 내용",
  },
};

export const Red: Story = {
  args: {
    size: "md",
    colorPalette: "red",
    children: "배지내용",
  },
};

export const Blue: Story = {
  args: {
    size: "md",
    colorPalette: "blue",
    children: "배지내용",
  },
};
