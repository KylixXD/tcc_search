"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';  // Corrigido o import
import { useState } from 'react';

export default function RegisterPage() {
  const [error, setError] = useState(null);
  const router = useRouter();  // Utiliza o useRouter corretamente

  const register = async (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const senha = e.target.senha.value;
    const usuario = e.target.usuario.value;

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha, usuario }),
      });

      if (!res.ok) throw new Error('Falha no registro');
      
      // Se a resposta foi bem-sucedida, faz o redirecionamento
      router.push("/auth/login");
      
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={register} className='h-screen flex justify-center items-center bg-slate px-5'>
      <div className=' bg-white p-12 rounded-lg w-96 max-w-full flex justify-center items-center flex-col gap-2'>
        <h2 className='font-bold text-xl mb-3 text-black'>Faça seu registro aqui</h2>
        <input type="text" placeholder="Usuário" required className='input input-primary w-full' name='usuario'/>
        <input type="email" placeholder="E-mail" required className='input input-primary w-full' name='email'/>
        <input type="password" placeholder="Senha" required className='input input-primary w-full' name='senha'/>
        <button type="submit" className='btn btn-primary w-full'>Registrar</button>
        <h3 className='text-black'>Se você já tem uma conta clique <strong><Link href="/auth/login" className='text-purple-500'>aqui</Link></strong></h3>
      </div>
    </form>
  );
}
