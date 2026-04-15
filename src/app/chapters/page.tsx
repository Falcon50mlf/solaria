"use client";
import dynamic from "next/dynamic";
const ChaptersContent = dynamic(() => import("./ChaptersContent"), { ssr: false });
export default function Page() {
  return <ChaptersContent />;
}
