"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

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

interface CaracteristicasTcc {
  id: number;
  objetoEstudo: string;
  usoConhecimento: string;
  objetivoEstudo: string;
  principalAreaConhecimento: string;
  coletaSerhumano: boolean;
  subareaComputacaoId: number;
}

interface TCC {
  id: number;
  titulo: string;
  autor: string;
  anoDefesa: string;
  resumo: string;
  link: string;
  cursoId: number;
  orientadorId: number;
  caracteristicasTccId: number;  // Adicionando o ID das características
  caracteristicasTcc: CaracteristicasTcc;  // Adicionando as características como um objeto aninhado
}

export default function EditTccPage() {
  const [tcc, setTcc] = useState<TCC | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [orientadores, setOrientadores] = useState<Orientador[]>([]);
  const [subareas, setSubareas] = useState<Subarea[]>([]);
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  // Carrega dados ao carregar a página
  useEffect(() => {
    if (id) {
      fetchTcc(id);
      fetchOptions();
    }
  }, [id]);

  const fetchTcc = async (id: string) => {
    try {
      const response = await fetch(`/api/tcc/${id}`);
      if (response.ok) {
        const data = await response.json();
        setTcc(data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Erro ao buscar TCC:", error);
      setIsLoading(false);
    }
  };

  // Busca as opções de curso, orientador e subárea
  const fetchOptions = async () => {
    try {
      const [cursosRes, orientadoresRes, subareasRes] = await Promise.all([
        fetch("/api/tcc/cursos"),
        fetch("/api/tcc/orientadores"),
        fetch("/api/tcc/subareas")
      ]);

      if (cursosRes.ok && orientadoresRes.ok && subareasRes.ok) {
        const cursosData = await cursosRes.json();
        const orientadoresData = await orientadoresRes.json();
        const subareasData = await subareasRes.json();
        setCursos(cursosData);
        setOrientadores(orientadoresData);
        setSubareas(subareasData);
      } else {
        setError("Erro ao carregar opções.");
      }
    } catch (err) {
      setError("Erro ao carregar opções.");
    }
  };

  // Função para manipular mudanças de valores
  const handleInputChange = (field: keyof TCC | keyof CaracteristicasTcc, value: string | number | boolean) => {
    // Verifica se o campo pertence às características do TCC
    if (['objetoEstudo', 'usoConhecimento', 'objetivoEstudo', 'principalAreaConhecimento', 'coletaSerhumano', 'subareaComputacaoId'].includes(field as string)) {
      setTcc((prev) => prev ? {
        ...prev,
        caracteristicasTcc: { ...prev.caracteristicasTcc, [field]: value }
      } : null);
    } else {
      // Caso contrário, atualiza o campo de TCC
      setTcc((prev) => (prev ? { ...prev, [field]: value } : null));
    }
  };
  

  // Função de atualizar TCC
  const handleUpdate = async () => {
    if (!tcc) return;

    const tccData = {
      titulo: tcc.titulo,
      autor: tcc.autor,
      anoDefesa: parseInt(tcc.anoDefesa.toString()),
      resumo: tcc.resumo,
      link: tcc.link,
      cursoId: parseInt(tcc.cursoId.toString()),
      orientadorId: parseInt(tcc.orientadorId.toString()),
      caracteristicasTccId: tcc.caracteristicasTccId,  // Enviando o ID das características
      objetoEstudo: tcc.caracteristicasTcc.objetoEstudo,
      usoConhecimento: tcc.caracteristicasTcc.usoConhecimento,
      objetivoEstudo: tcc.caracteristicasTcc.objetivoEstudo,
      principalAreaConhecimento: tcc.caracteristicasTcc.principalAreaConhecimento,
      coletaSerhumano: tcc.caracteristicasTcc.coletaSerhumano,
      subareaComputacaoId: tcc.caracteristicasTcc.subareaComputacaoId,
    };

    console.log(tccData)

    try {
      const response = await fetch(`/api/tcc/${tcc.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tccData),
      });

      if (response.ok) {
        setSuccess("TCC atualizado com sucesso!");
        setError("");
        setTimeout(() => {
          router.replace("/admin");  // Use replace para redirecionamento mais rápido
        }, 2000);
      } else {
        setError("Erro ao atualizar TCC");
      }
    } catch (error) {
      setError("Erro ao atualizar TCC:");
    }
  };


  // Renderiza formulário de edição
  if (isLoading) return <p>Carregando...</p>;
  if (!tcc) return <p>TCC não encontrado</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10 mb-10">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">Editar TCC</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form className="space-y-4">
        <input
          type="text"
          value={tcc.titulo}
          onChange={(e) => handleInputChange("titulo", e.target.value)}
          placeholder="Título"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
        />
        <input
          type="text"
          value={tcc.autor}
          onChange={(e) => handleInputChange("autor", e.target.value)}
          placeholder="Autor"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          value={tcc.anoDefesa}
          onChange={(e) => handleInputChange("anoDefesa", e.target.value)}
          placeholder="Ano de Defesa"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          value={tcc.resumo}
          onChange={(e) => handleInputChange("resumo", e.target.value)}
          placeholder="Resumo"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
        <input
          type="text"
          value={tcc.link}
          onChange={(e) => handleInputChange("link", e.target.value)}
          placeholder="Link"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={tcc.cursoId}
          onChange={(e) => handleInputChange("cursoId", parseInt(e.target.value))}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>Selecione um Curso</option>
          {cursos.map((curso) => (
            <option key={curso.id} value={curso.id}>
              {curso.curso}
            </option>
          ))}
        </select>

        <select
          value={tcc.orientadorId}
          onChange={(e) => handleInputChange("orientadorId", parseInt(e.target.value))}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>Selecione um Orientador</option>
          {orientadores.map((orientador) => (
            <option key={orientador.id} value={orientador.id}>
              {orientador.nome}
            </option>
          ))}
        </select>

        <select
          value={tcc.caracteristicasTcc.subareaComputacaoId}
          onChange={(e) => handleInputChange("subareaComputacaoId", parseInt(e.target.value))}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>Selecione uma Subárea</option>
          {subareas.map((subarea) => (
            <option key={subarea.id} value={subarea.id}>
              {subarea.subareas}
            </option>
          ))}
        </select>

        <h3 className="text-lg font-semibold mt-6 text-blue-600">Características do TCC</h3>
        <input
          type="text"
          value={tcc.caracteristicasTcc.objetoEstudo}
          onChange={(e) => handleInputChange("objetoEstudo", e.target.value)}
          placeholder="Objeto de Estudo"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={tcc.caracteristicasTcc.usoConhecimento}
          onChange={(e) => handleInputChange("usoConhecimento", e.target.value)}
          placeholder="Uso do Conhecimento"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={tcc.caracteristicasTcc.objetivoEstudo}
          onChange={(e) => handleInputChange("objetivoEstudo", e.target.value)}
          placeholder="Objetivo do Estudo"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={tcc.caracteristicasTcc.principalAreaConhecimento}
          onChange={(e) => handleInputChange("principalAreaConhecimento", e.target.value)}
          placeholder="Área de Conhecimento"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label className="inline-flex items-center mt-4">
          <input
            type="checkbox"
            checked={tcc.caracteristicasTcc.coletaSerhumano}
            onChange={() => handleInputChange("coletaSerhumano", !tcc.caracteristicasTcc.coletaSerhumano)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2">Coleta com Seres Humanos</span>
        </label>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={handleUpdate}
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            Salvar
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="w-full py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
