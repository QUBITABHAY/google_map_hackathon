"use client";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../component/map"), {
  ssr: false
});

export default function Home() {
  return (
    <div>
      <Map />
    </div>
  );
}
