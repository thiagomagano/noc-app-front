"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const isLoggedIn = await fetch("/api/auth/check"); // Endpoint para verificar autenticação
      const { authenticated } = await isLoggedIn.json();

      if (authenticated) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div className="grid place-items-center h-svh">
      <h1 className="font-bold text-5xl font-serif animate-spin">
        Carregando...
      </h1>
    </div>
  );
}
