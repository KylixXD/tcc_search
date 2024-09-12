'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Corrigido: Remover as chaves ao importar o pacote
import Image from 'next/image'

interface DecodedToken {
  id: string;
  email: string;
  usuario: string;
  isAdmin: boolean;
  exp: number;
}

export function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<DecodedToken | null>(null);

  useEffect(() => {
    // Busca o token do localStorage
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setUser(decoded); // Armazena o usuário decodificado no estado
      } catch (error) {
        console.error('Erro ao decodificar o token JWT', error);
        handleLogout(); // Se o token for inválido, faça o logout
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove o token do localStorage
    setUser(null); // Limpa o estado do usuário
    router.push('/auth/login'); // Redireciona para a página de login
  };

  return (
  <div className="navbar bg-gray-100 text-blue-500">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow "
          >
            <li>
              <Link href="/tcc/list">TCCs</Link>
            </li>
            {/* Condicional para exibir a aba de "Admin" apenas para administradores */}
            {user && user.isAdmin && (
              <>
                <li>
                <Link href="/admin">Admin</Link>
                </li>
                <li>
                <Link href="/tcc/createTcc">Criar TCC</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link href="/" className="btn btn-ghost text-xl">
        <Image src='/logo_dcc.png'  width={50} height={50} alt='logo DCC'/>
        
          TCC Search
        </Link>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <span className="mr-4">{user.usuario}</span> {/* Exibe o nome do usuário dinamicamente */}
            <button onClick={handleLogout} className="btn btn-ghost btn-circle text-red-500">
              <LogoutIcon className="h-5 w-5" />
            </button>
          </>
        ) : (
          <Link href="/auth/login" className="btn btn-ghost">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
