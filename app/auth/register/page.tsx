"use client"

import { useState } from 'react';

export default function RegisterPage() {
  const [error, setError] = useState(null);

  const register = async (e:any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const senha = e.target.senha.value;

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      if (!res.ok) throw new Error('Failed to register');

      // Redirect or inform user of success
    } catch (error:any) {
      setError(error.message);
    }
  };

  return (
    <div className='h-screen flex justify-center items-center bg-slate-600 px-5'>
     <form onSubmit={register} className='bg-white p-12 rounded-lg w-96 max-w-full flex justify-center items-center flex-col gap-2'>
      <h2 className='font-bold text-xl mb-3'>Faça seu registro aqui</h2>
      <input type="text" placeholder="Usuário" required className='input input-primary w-full' name='usuario'/>
      <input type="email" placeholder="E-mail" required className='input input-primary w-full' name='email'/>
      <input type="password" placeholder="senha" required className='input input-primary w-full' name='senha'/>
      <button type="submit" className='btn btn-primary w-full'>Login</button>
    </form>
  </div>
  );
}
