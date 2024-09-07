'use client';

import Link from "next/link";
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export function Navbar(){
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);  // Decodifica corretamente o token
      setUser(decoded); // Define o usuário decodificado
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/auth/login');
  };

  return (
    <header className="bg-gray-900 px-5 py-4">
      <div className="container mx-auto flex justify-between ">
        <h1 className="text-xl font-bold">TCC Search</h1>
        <nav>
          {user ? (
            <>
              <span className="text-white">{user.usuario}</span>  {/* Mostra o nome do usuário */}
              <button onClick={handleLogout} className="ml-4 text-red-500"><LogoutIcon/></button>
            </>
          ) : (
            <Link href="/auth/login">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
