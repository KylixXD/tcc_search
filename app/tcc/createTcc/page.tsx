'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Curso {
  id: number;
  curso: string;
}

interface Orientador {
  id: number;
  nome: string;
}

interface Subarea {
  id: number;
  subareas: string;
}

export default function CriarTCC() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    anoDefesa: '',
    resumo: '',
    link: '',
    cursoId: '',
    orientadorId: '',
    objetoEstudo: '',
    usoConhecimento: '',
    objetivoEstudo: '',
    principalAreaConhecimento: '',
    coletaSerhumano: false,
    subareaComputacaoId: ''
  });

  const [cursos, setCursos] = useState<Curso[]>([]);
  const [orientadores, setOrientadores] = useState<Orientador[]>([]);
  const [subareas, setSubareas] = useState<Subarea[]>([]); // Novo estado para subáreas
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    async function fetchOptions() {
      try {
        const cursosRes = await fetch('/api/tcc/cursos');
        const orientadoresRes = await fetch('/api/tcc/orientadores');
        const subareasRes = await fetch('/api/tcc/subareas'); // Chama a nova API de subáreas

        if (cursosRes.ok && orientadoresRes.ok && subareasRes.ok) {
          const cursosData = await cursosRes.json();
          const orientadoresData = await orientadoresRes.json();
          const subareasData = await subareasRes.json(); // Obtém os dados de subáreas

          setCursos(cursosData);
          setOrientadores(orientadoresData);
          setSubareas(subareasData); // Define as subáreas no estado
        } else {
          setError('Erro ao carregar cursos, orientadores ou subáreas.');
        }
      } catch (err) {
        setError('Erro ao carregar opções.');
      }
    }

    fetchOptions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = {
      ...formData,
      anoDefesa: parseInt(formData.anoDefesa),
      cursoId: parseInt(formData.cursoId),
      orientadorId: parseInt(formData.orientadorId),
      subareaComputacaoId: parseInt(formData.subareaComputacaoId),
    };

    try {
      const response = await fetch('/api/tcc/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setSuccess('TCC criado com sucesso!');
        setError('');
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        const errorMsg = await response.text();
        setError(errorMsg);
      }
    } catch (err) {
      console.error('Erro ao criar TCC:', err);
      setError('Erro ao criar TCC.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10 mb-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Criar Novo TCC</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="titulo"
          placeholder="Título"
          value={formData.titulo}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          name="autor"
          placeholder="Autor"
          value={formData.autor}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          name="anoDefesa"
          placeholder="Ano de Defesa"
          type="number"
          value={formData.anoDefesa}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <textarea
          name="resumo"
          placeholder="Resumo"
          value={formData.resumo}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          rows={4}
        />
        <input
          name="link"
          placeholder="Link"
          value={formData.link}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <select
          name="cursoId"
          value={formData.cursoId}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="" disabled>Selecione um Curso</option>
          {cursos.map((curso) => (
            <option key={curso.id} value={curso.id}>
              {curso.curso}
            </option>
          ))}
        </select>

        <select
          name="orientadorId"
          value={formData.orientadorId}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="" disabled>Selecione um Orientador</option>
          {orientadores.map((orientador) => (
            <option key={orientador.id} value={orientador.id}>
              {orientador.nome}
            </option>
          ))}
        </select>

        <select
          name="subareaComputacaoId"
          value={formData.subareaComputacaoId}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="" disabled>Selecione uma Subárea</option>
          {subareas.map((subarea) => (
            <option key={subarea.id} value={subarea.id}>
              {subarea.subareas}
            </option>
          ))}
        </select>

        <h3 className="text-lg font-semibold mt-6 ">Características do TCC</h3>
        <input
          name="objetoEstudo"
          placeholder="Objeto de Estudo"
          value={formData.objetoEstudo}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          name="usoConhecimento"
          placeholder="Uso do Conhecimento"
          value={formData.usoConhecimento}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          name="objetivoEstudo"
          placeholder="Objetivo do Estudo"
          value={formData.objetivoEstudo}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          name="principalAreaConhecimento"
          placeholder="Área de Conhecimento"
          value={formData.principalAreaConhecimento}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <label className="inline-flex items-center mt-4">
          <input
            type="checkbox"
            name="coletaSerhumano"
            checked={formData.coletaSerhumano}
            onChange={() => setFormData({ ...formData, coletaSerhumano: !formData.coletaSerhumano })}
            className="form-checkbox h-5 w-5 text-purple-600"
          />
          <span className="ml-2">Coleta com Seres Humanos</span>
        </label>

        <button
          type="submit"
          className="w-full py-2 mt-4 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition duration-300"
        >
          Criar TCC
        </button>
      </form>
    </div>
  );
}
