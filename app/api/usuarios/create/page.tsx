"use client"

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Page = () => {
    const [email, setEmail] = useState('')
    const [usuario, setUser] = useState('')
    const [senha, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
    
        try {
            const res = await fetch('/api/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    usuario,
                    senha,
                    isAdmin: false,
                }),
            });
    
            if (!res.ok) {
                console.error('Erro ao cadastrar usuário:', res.statusText);
                return;
            }
    
            console.log('Usuário cadastrado com sucesso!');
            router.push('/');
        } catch (error) {
            console.error('Erro ao cadastrar usuário', error);
        } finally {
            setIsLoading(false);
        }
    };
    

    return (
        <form className='w-[500px] mx-auto pt-20 flex flex-col gap-2' onSubmit={handleSubmit}>
            <h1 className='w-full p-2 text-center text-2xl font-bold'>Cadastre-se</h1>
            <input
                type="email"
                placeholder='Coloque seu email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full border p-2 rounded-md'
                required
            />
            <input
                type="text"
                placeholder='Coloque seu usuário'
                value={usuario}
                onChange={(e) => setUser(e.target.value)}
                className='w-full border p-2 rounded-md'
                required
            />
            <input
                type="password"
                placeholder='Sua senha aqui'
                value={senha}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full border p-2 rounded-md'
                required
            />
            <button
                type="submit"
                disabled={isLoading}
                className='w-full bg-blue-500 text-white p-2 rounded-md mt-4 hover:bg-blue-600 transition-colors'
            >
                {isLoading ? 'Carregando ...' : 'Cadastrar'}
            </button>
        </form>
    )
}

export default Page