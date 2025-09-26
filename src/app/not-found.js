"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/"); // redirect to home immediately
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-xl font-bold">Redirecting to home...</h1>
    </div>
  );
}