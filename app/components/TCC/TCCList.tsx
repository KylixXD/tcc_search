'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'; // Hook para acessar parâmetros de query
import Link from 'next/link';
import { Pagination } from './Pagination';
import { SearchBar } from './SearchBar';
import { Suspense } from 'react';

interface TCC {
  id: number;
  titulo: string;
  autor: string;
  curso: {
    curso: string;
  };
  orientador: {
    nome: string;
  };
}

export default function TccList() {
  const [tccs, setTccs] = useState<TCC[]>([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const searchParams = useSearchParams(); // Hook para pegar os parâmetros da URL
  const [isClient, setIsClient] = useState(false);

  const searchTerm = searchParams.get('searchTerm') || ''; // Pega o termo de pesquisa
  const filter = searchParams.get('filter') || ''; // Pega o filtro

  const limit = 10; // Limite de TCCs por página

  useEffect(() => {
    async function fetchTccs() {
      try {
        const response = await fetch(
          `/api/tcc/search?searchTerm=${searchTerm}&filter=${filter}&limit=${limit}&offset=${
            (currentPage - 1) * limit
          }`
        );
        if (response.ok) {
          const data = await response.json();
          setTccs(data.tccs);
          setTotalPages(Math.ceil(data.totalTccs / limit)); // Calcula o total de páginas
        } else {
          setError('Erro ao buscar TCCs');
        }
      } catch (err) {
        setError('Erro ao buscar TCCs');
      }
    }
    fetchTccs();
  }, [searchTerm, filter, currentPage]);

  return (
    <>
      <Suspense  fallback={<div>Loading...</div>}>
        <SearchBar shouldRedirect={false} /> {/* Mantém o componente SearchBar para nova pesquisa */}
          <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10 text-blue-500">
            {/* Mostrar o texto antes dos resultados */}
            <h2 className="text-2xl font-semibold mb-4">Aqui estão os resultados da sua pesquisa:</h2>
            
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {tccs.length === 0 ? (
              <p className="text-black mb-4">Nenhum TCC encontrado com os critérios de pesquisa.</p>
            ) : (
              <ul>
                {tccs.map((tcc) => (
                  <li key={tcc.id} className="mb-4 border-b pb-2">
                    <Link href={`/tcc/${tcc.id}`} passHref>
                      <div className="hover:bg-gray-100 cursor-pointer p-2 rounded-lg">
                        <h2 className="text-xl font-semibold">{tcc.titulo}</h2>
                        <p>Autor: {tcc.autor}</p>
                        <p>Curso: {tcc.curso.curso}</p>
                        <p>Orientador: {tcc.orientador.nome}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex justify-center mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
      </Suspense>
    </>
  );
}
