"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type LoginForm = {
  email: string;
  password: string;
};

const API_URL = process.env.API_URL || "http://localhost:3131";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const onSubmit = async (data: LoginForm) => {
    setErrorMessage("");

    try {
      const response = await fetch(API_URL + "/auth/login", {
        // Ajuste para a URL do backend
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Login failed");

      localStorage.setItem("token", result.token);
      router.push("/dashboard"); // Redireciona após login
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-black p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        {errorMessage && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email é obrigatório" })}
              className="w-full p-2 border rounded mt-1 bg-gray-900"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium">Senha</label>
            <input
              type="password"
              {...register("password", { required: "Senha é obrigatória" })}
              className="w-full p-2 border rounded mt-1 bg-gray-900"
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full mt-6 p-2 bg-red-500 text-white rounded">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
