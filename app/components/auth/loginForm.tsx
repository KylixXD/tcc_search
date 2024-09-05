"use client";

import { FormEvent } from "react";
import { signIn } from "next-auth/react"

export default function LoginForm(){
    async function login(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        const data = {
            email: formData.get("email"),
            password: formData.get("senha"),
        };

        signIn("credentials", {
            ...data,
            callbackUrl: "/home",
            
        })
    }

    return(
        <form onSubmit={login} className="bg-white p-12 rounded-lg w-96 max-w-full flex justify-center items-center flex-col gap-2">
              <h2 className="font-bold text-xl mb-3">Faça Seu Login</h2>
                  <input type="email" placeholder="Email" name="email" className="input input-primary w-full"/>
                  <input type="password" placeholder="Senha" name="senha" className="input input-primary w-full"/>
                  <button className="btn btn-primary w-full" type="submit">Login</button>
            </form>
    )
}