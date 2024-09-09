"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {jwtDecode } from "jwt-decode";

export default function AdminPage() {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();
  
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded: any = jwtDecode(token);
        setUser(decoded);
  
        if (!decoded.isAdmin) {
          router.push("/");  // Redireciona se não for admin
        }
      } else {
        router.push("/auth/login");  // Redireciona se não estiver logado
      }
    }, [router]);
  
    return (
      <>
        {user && user.isAdmin ? (
          <h1>Admin Dashboard</h1>
        ) : (
          <p>Redirecionando...</p>
        )}
      </>
    );
}