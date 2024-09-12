"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface TCC {
  id: number;
  titulo: string;
  autor: string;
  curso: { curso: string };
  orientador: { nome: string };
}

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [tccs, setTccs] = useState<TCC[]>([]);
  const [editingTcc, setEditingTcc] = useState<TCC | null>(null); // Estado para TCC em edição
  const router = useRouter();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: any = jwtDecode(token);
      setUser(decoded);

      if (!decoded.isAdmin) {
        router.push("/"); // Redireciona se não for admin
      } else {
        fetchTccs(); // Busca TCCs apenas se o usuário for admin
      }
    } else {
      router.push("/auth/login"); // Redireciona se não estiver logado
    }
  }, [router]);

  const fetchTccs = async () => {
    try {
      const response = await fetch("/api/tcc/read"); // Certifique-se de que a API está configurada corretamente
      if (response.ok) {
        const data = await response.json();
        setTccs(data.tccs);
      }
    } catch (error) {
      console.error("Erro ao buscar TCCs:", error);
    }
  };

  const handleEdit = (tcc: TCC) => {
    console.log("Editando TCC:", tcc);
    router.push(`/tcc/editTcc/${tcc.id}`); // Redireciona para a página de edição
  };
  
  

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Tem certeza de que deseja excluir este TCC?");
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/tcc/${id}`, { method: "DELETE" });
      if (response.ok) {
        setTccs(tccs.filter((tcc) => tcc.id !== id)); // Remove o TCC excluído do estado
      }
    } catch (error) {
      console.error("Erro ao excluir TCC:", error);
    }
  };

  const handleUpdate = async () => {
    if (!editingTcc) return;

    console.log("Atualizando TCC:", editingTcc);

    try {
      const response = await fetch(`/api/tcc/${editingTcc.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingTcc),
      });

      if (response.ok) {
        const updatedTcc = await response.json();
        setTccs((prev) =>
          prev.map((tcc) => (tcc.id === updatedTcc.id ? updatedTcc : tcc))
        ); // Atualiza a lista de TCCs
        setEditingTcc(null); // Fecha o modal de edição
      }
    } catch (error) {
      console.error("Erro ao atualizar TCC:", error);
    }
  };

  return (
    <>
      {user && user.isAdmin ? (
        <div className="overflow-x-auto text-black">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr className="text-gray-500">
                <th>#</th>
                <th>Título</th>
                <th>Autor</th>
                <th>Curso</th>
                <th>Orientador</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {tccs.map((tcc, index) => (
                <tr key={tcc.id}>
                  <th>{index + 1}</th>
                  <td>{tcc.titulo}</td>
                  <td>{tcc.autor}</td>
                  <td>{tcc.curso.curso}</td>
                  <td>{tcc.orientador.nome}</td>
                  <td>
                    <button
                      onClick={() => router.push(`/tcc/editTcc/${tcc.id}`)}
                      className="bg-blue-500 px-4 py-2 rounded mr-2 w-20"
                    >
                    <EditIcon className="bg-transparent text-gray-300"/>
                    </button>
                    <button
                      onClick={() => handleDelete(tcc.id)}
                      className="bg-red-500 px-4 py-2 rounded w-20"
                    >
                      <DeleteIcon className="bg-transparent text-gray-300"/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Redirecionando...</p>
      )}
    </>
  );
}
