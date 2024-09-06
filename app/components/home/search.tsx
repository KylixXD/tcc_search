import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export function SearchBar(){
    return(
        <div className="join w-full justify-center mt-2">
            <input className="input input-bordered join-item w-1/3 "  />
            <select className="select select-bordered join-item" defaultValue="DEFAULT"> 
                <option disabled value="DEFAULT">filtro</option>
                <option value="Ano_de_Defesa">Ano de Defesa</option>
                <option value="Curso">Curso</option>
                <option value="Orientador">Orientador</option>
                <option value="Autor">Autor</option>
                <option value="Titulo">Titulo</option>
                
            </select>
            <div className="indicator">
                
                <button className="btn join-item"><SearchIcon></SearchIcon></button>
            </div>
        </div>
    )
}
