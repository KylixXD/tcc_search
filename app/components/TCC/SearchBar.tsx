'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  shouldRedirect?: boolean;
}

export function SearchBar({ shouldRedirect = true }: SearchBarProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');

  const handleSearch = () => {
    if (searchTerm || filter) {
      if (shouldRedirect) {
        router.push(`/tcc/list?searchTerm=${searchTerm.trim()}&filter=${filter}`);
      } else {
        router.replace(`?searchTerm=${searchTerm.trim()}&filter=${filter}`);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="join flex items-center justify-center p-4 w-full">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Pesquisar TCCs"
        onKeyPress={handleKeyPress}
        className="input input-bordered join-item bg-white w-full"
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
        <button className="btn join-item bg-white hover:bg-gray-200 hover:border-gray-200 border-gray-200 b" onClick={handleSearch}><SearchIcon/></button>
       </div>
    </div>  
  );
}
