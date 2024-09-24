"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Pagination } from "../components/TCC/Pagination";
import { SearchBar } from "../components/TCC/SearchBar";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;
  const router = useRouter();

  // Utilize Suspense para renderizar componentes que usam hooks dependentes do lado do cliente
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminContent
        user={user}
        setUser={setUser}
        tccs={tccs}
        setTccs={setTccs}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        setTotalPages={setTotalPages}
        limit={limit}
      />
    </Suspense>
  );
}

function AdminContent({
  user,
  setUser,
  tccs,
  setTccs,
  currentPage,
  setCurrentPage,
  totalPages,
  setTotalPages,
  limit,
}: any) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchTerm = searchParams.get('searchTerm') || '';
  const filter = searchParams.get('filter') || '';

  useEffect(() => {
    const fetchTccs = async () => {
      try {
        const response = await fetch(`/api/tcc/search?searchTerm=${searchTerm}&filter=${filter}&limit=${limit}&offset=${(currentPage - 1) * limit}`);
        if (response.ok) {
          const data = await response.json();
          setTccs(data.tccs);
          setTotalPages(Math.ceil(data.totalTccs / limit));
        }
      } catch (error) {
        console.error("Erro ao buscar TCCs:", error);
      }
    };

    const token = localStorage.getItem("token");
    if (token) {
      const decoded: any = jwtDecode(token);
      setUser(decoded);

      if (!decoded.isAdmin) {
        router.push("/");
      } else {
        fetchTccs(); // Chama a função para buscar TCCs com base nos parâmetros de pesquisa
      }
    } else {
      router.push("/auth/login");
    }
  }, [router, currentPage, searchTerm, filter, setTccs, setTotalPages, setUser,limit]); // Inclua searchTerm e filter como dependências

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Tem certeza de que deseja excluir este TCC?");
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/tcc/${id}`, { method: "DELETE" });
      if (response.ok) {
        setTccs(tccs.filter((tcc: TCC) => tcc.id !== id));
      }
    } catch (error) {
      console.error("Erro ao excluir TCC:", error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (!user) {
    return <p>Redirecionando...</p>;
  }

  return user.isAdmin ? (
    <div className="overflow-x-auto text-black w-2/3 mx-auto">
      <div className="w-2/3 mx-auto">
        <SearchBar shouldRedirect={false} /> {/* Não redireciona ao pesquisar */}
      </div>
      <table className="table w-full mt-4">
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
          {tccs.map((tcc: TCC, index: number) => (
            <tr key={tcc.id}>
              <th>{index + 1 + (currentPage - 1) * limit}</th>
              <td>{tcc.titulo}</td>
              <td>{tcc.autor}</td>
              <td>{tcc.curso.curso}</td>
              <td>{tcc.orientador.nome}</td>
              <td className="flex gap-1 pb-1">
                <button
                  onClick={() => router.push(`/tcc/editTcc/${tcc.id}`)}
                  className="bg-blue-500 px-4 py-2 rounded mr-2 w-20"
                >
                  <EditIcon className="bg-transparent text-white"/>
                </button>
                <button
                  onClick={() => handleDelete(tcc.id)}
                  className="bg-red-500 px-4 py-2 rounded w-20"
                >
                  <DeleteIcon className="bg-transparent text-white"/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  ) : (
    <p>Redirecionando...</p>
  );
}
