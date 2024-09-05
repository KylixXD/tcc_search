'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = {
      email: formData.get("email"), 
      // usuario: formData.get("usuario"),
      senha: formData.get("senha"), 
    };

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(errorMessage);
      }

      const result = await res.json();

      // Armazenar o token no localStorage (ou em cookies)
      localStorage.setItem("token", result.token);

      // Redirecionar o usuário para uma página protegida após o login
      router.push("/"); // Exemplo de página protegida

    } catch (error: any) {
      setError(error.message);
    }
  }

  return (
      <form onSubmit={login} className='h-screen flex justify-center items-center bg-slate-600 px-5'>
        <div className='bg-white p-12 rounded-lg w-96 max-w-full flex justify-center items-center flex-col gap-2'>
          <h2 className='font-bold text-xl mb-3'>Faça seu login</h2>
          {error && <p className="text-red-500">{error}</p>} {/* Mostrar erros de login */}
          <input type="email" placeholder="E-mail" required className='input input-primary w-full' name='email'/>
          <input type="password" placeholder="senha" required className='input input-primary w-full' name='senha'/>
          <button type="submit" className='btn btn-primary w-full'>Login</button>
        </div>
      </form>
  );
}
