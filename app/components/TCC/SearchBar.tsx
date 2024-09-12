'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';


export function SearchBar() {
  const router = useRouter(); // Inicialização do hook useRouter
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');

  const handleSearch = () => {
    // Verifica se há termo de pesquisa ou filtro selecionado
    if (searchTerm || filter) {
      // Redireciona para a página de listagem de TCCs com parâmetros de pesquisa
      router.push(`/tcc/list?searchTerm=${searchTerm}&filter=${filter}`);
    }
  };

  return (
    <div className="join flex items-center justify-center p-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Pesquisar TCCs"
        className="input input-bordered join-item w-1/3 bg-white"
      />
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="select select-bordered join-item bg-white"
      >
        <option value="">Todos</option>
        <option value="titulo">Título</option>
        <option value="autor">Autor</option>
        <option value="curso">Curso</option>
        <option value="orientador">Orientador</option>
        <option value="anoDefesa">Ano de Defesa</option>
      </select>
      <div className="indicator">
        <button className="btn join-item bg-white hover:bg-gray-200 border border-gray-200 " onClick={handleSearch}><SearchIcon/></button>
       </div>
    </div>  
  );
}
