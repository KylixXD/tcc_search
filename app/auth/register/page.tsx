"use client"

import { useState } from 'react';

export default function RegisterPage() {
  const [error, setError] = useState(null);

    const register = async (e:any) => {
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
  
          // Sucesso, você pode redirecionar ou mostrar uma mensagem de sucesso
      } catch (error:any) {
          setError(error.message);
      }
  };

  return (
    <form onSubmit={register} className='h-screen flex justify-center items-center bg-slate-600 px-5'>
      <div className=' bg-white p-12 rounded-lg w-96 max-w-full flex justify-center items-center flex-col gap-2'>
        <h2 className='font-bold text-xl mb-3'>Faça seu registro aqui</h2>
        <input type="text" placeholder="Usuário" required className='input input-primary w-full' name='usuario'/>
        <input type="email" placeholder="E-mail" required className='input input-primary w-full' name='email'/>
        <input type="password" placeholder="senha" required className='input input-primary w-full' name='senha'/>
        <button type="submit" className='btn btn-primary w-full'>Login</button>
    </div>
    </form>
  );
}
