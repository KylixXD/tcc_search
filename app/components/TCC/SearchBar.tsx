import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  setSearchTerm: (term: string) => void;
  setFilter: (filter: string) => void;
}

export function SearchBar({ setSearchTerm, setFilter }: SearchBarProps) {
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const [localFilter, setLocalFilter] = useState('');

  const handleSearch = () => {
    setSearchTerm(localSearchTerm);
    setFilter(localFilter);
  };

  // Função para capturar o pressionamento da tecla Enter
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col items-center flex-grow mt-5">
      <h2 className="text-2xl font-semibold mb-4">Busca de TCCs</h2>
      <div className="w-full"></div>
      <div className="join w-full justify-center mt-2">
        <input
          className="input input-bordered join-item w-1/3"
          value={localSearchTerm}
          onChange={(e) => setLocalSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress} // Adicionado para detectar o Enter
        />
        <select
          className="select select-bordered join-item"
          defaultValue="DEFAULT"
          onChange={(e) => setLocalFilter(e.target.value)}
        >
          <option disabled value="DEFAULT">Filtros</option>
          <option value="Ano_de_Defesa">Ano de Defesa</option>
          <option value="Curso">Curso</option>
          <option value="Orientador">Orientador</option>
          <option value="Autor">Autor</option>
          <option value="Titulo">Titulo</option>
        </select>
        <div className="indicator">
          <button className="btn join-item" onClick={handleSearch}>
            <SearchIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
