'use client'

import { useEffect, useState } from 'react';

export function TccList() {
  const [tccs, setTccs] = useState([]);

  useEffect(() => {
    // Faz a requisição para a API que retorna a lista de TCCs
    fetch('/api/tccs')
      .then((response) => response.json())
      .then((data) => setTccs(data))
      .catch((error) => console.error('Erro ao buscar TCCs:', error));
  }, []);

  return (
    <div className="tcc-list">
      {tccs.map((tcc: any) => (
        <div key={tcc.id} className="tcc-card">
          <h3>{tcc.titulo}</h3>
          <p><strong>Autor:</strong> {tcc.autor}</p>
          <p><strong>Ano de Defesa:</strong> {tcc.anoDefesa}</p>
          <p><strong>Curso:</strong> {tcc.curso.curso}</p>
          <p><strong>Orientador:</strong> {tcc.orientador.nome}</p>
          <p><strong>Resumo:</strong> {tcc.resumo}</p>
          <a href={tcc.link}>Acesse o TCC</a>
        </div>
      ))}
    </div>
  );
}
