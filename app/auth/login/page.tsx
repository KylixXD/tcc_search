'use client';

import { signIn } from 'next-auth/react';

export default function LoginPage() {
    async function login(e: React.FormEvent<HTMLFormElement>){
      e.preventDefault();
      const formData = new FormData(e.currentTarget);

      const data = {
        email: formData.get("email"),
        password: formData.get("senha")
      };

      console.log(data);
      fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      })
    }

  return (
      <form onSubmit={login} className='h-screen flex justify-center items-center bg-slate-600 px-5'>
        <div className='bg-white p-12 rounded-lg w-96 max-w-full flex justify-center items-center flex-col gap-2'>
          <h2 className='font-bold text-xl mb-3'>Faça seu login</h2>
          <input type="email" placeholder="E-mail" required className='input input-primary w-full' name='email'/>
          <input type="password" placeholder="senha" required className='input input-primary w-full' name='senha'/>
          <button type="submit" className='btn btn-primary w-full'>Login</button>
        </div>
      </form>
  );
}
