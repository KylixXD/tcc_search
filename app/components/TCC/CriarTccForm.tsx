import { useState } from 'react';

export default function CriarTccForm() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [anoDefesa, setAnoDefesa] = useState(2024);
  const [resumo, setResumo] = useState('');
  const [link, setLink] = useState('');
  const [cursoId, setCursoId] = useState(1);
  const [orientadorId, setOrientadorId] = useState(1);
  const [caracteristicasTccId, setCaracteristicasTccId] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');  // Supondo que você tenha armazenado o token no login

    try {
      const response = await fetch('/api/tcc/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`  // Enviando o token JWT no cabeçalho
        },
        body: JSON.stringify({
          titulo,
          autor,
          anoDefesa,
          resumo,
          link,
          cursoId,
          orientadorId,
          caracteristicasTccId
        })
      });

      if (response.ok) {
        console.log('TCC criado com sucesso!');
      } else {
        console.error('Erro ao criar TCC');
      }
    } catch (error) {
      console.error('Erro ao realizar a requisição:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='bg-white p-12 rounded-lg w-96 max-w-full flex justify-center items-center flex-col gap-2'>
      <input value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Título" />
      <input value={autor} onChange={(e) => setAutor(e.target.value)} placeholder="Autor" />
      <input type="number" value={anoDefesa} onChange={(e) => setAnoDefesa(Number(e.target.value))} placeholder="Ano de Defesa" />
      <input value={resumo} onChange={(e) => setResumo(e.target.value)} placeholder="Resumo" />
      <input value={link} onChange={(e) => setLink(e.target.value)} placeholder="Link" />
      <input type="number" value={cursoId} onChange={(e) => setCursoId(Number(e.target.value))} placeholder="Curso ID" />
      <input type="number" value={orientadorId} onChange={(e) => setOrientadorId(Number(e.target.value))} placeholder="Orientador ID" />
      <input type="number" value={caracteristicasTccId} onChange={(e) => setCaracteristicasTccId(Number(e.target.value))} placeholder="Características TCC ID" />
      <button type="submit">Criar TCC</button>
    </form>
  );
}
