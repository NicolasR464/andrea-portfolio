"use client";

import { useRouter } from "next/navigation";

export default function BackBtn() {
  const router = useRouter();
  return (
    <button
      className="btn btn-outline btn-warning mb-1 absolute ml-5"
      type="button"
      onClick={() => router.back()}
    >
      BACK
    </button>
  );
}
