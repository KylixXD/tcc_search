'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext } from 'react';
import { UserContext } from '../../auth/login/UserContext';
import Image from 'next/image';

export function Navbar() {
  const router = useRouter();
  const userContext  = useContext(UserContext);

  if (!userContext) {
    throw new Error('UserContext must be used within a UserProvider');
  }

  const { user, logout } = userContext;
  
  const handleLogout = () => {
    logout(); // Chama a função de logout do contexto
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
            className="menu menu-sm dropdown-content bg-gray-100 rounded-box z-[1] mt-3 w-52 p-2 shadow "
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
          <Image src='/logo_dcc.png' width={50} height={50} alt='logo DCC'/>
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
