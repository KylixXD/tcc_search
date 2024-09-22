'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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

      if (res.ok) {
        const { token } = await res.json();
        localStorage.setItem('token', token);

      router.push('/');
      } else {
        const errorMessage = await res.text();
        throw new Error(errorMessage);
      }

    } catch (error: any) {
      setError(error.message);
    }
  }

  return (
      <form onSubmit={login} className='h-screen flex justify-center items-center px-5 text-black '>
        <div className='p-12 rounded-lg w-96 max-w-full flex justify-center items-center flex-col gap-2 text-black bg-gray-100'>
          <h2 className='font-bold text-3xl mb-10 bg-transparent text-blue-600'>Login</h2>
          {error && <p className="text-red-500">{error}</p>} {/* Mostrar erros de login */}
          <input type="email" placeholder="E-mail" required className='input input-primary w-full ' name='email'/>
          <input type="password" placeholder="senha" required className='input input-primary w-full' name='senha'/>
          <button type="submit" className='btn btn-primary bg-blue-500 w-full text-white mt-3 hover:bg-blue-700' >Entrar</button>
          <h3 className='text-gray-500 mt-2'>Se você não tem uma conta clique <strong><Link href="/auth/register" className='text-blue-500 link-'>aqui</Link></strong></h3>
        </div>
      </form>
  );
}
