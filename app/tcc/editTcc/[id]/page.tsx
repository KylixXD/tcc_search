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

interface TCC {
  id: number;
  titulo: string;
  autor: string;
  anoDefesa: string;
  resumo: string;
  link: string;
  cursoId: number;
  orientadorId: number;
  objetoEstudo: string;
  usoConhecimento: string;
  objetivoEstudo: string;
  principalAreaConhecimento: string;
  coletaSerhumano: boolean;
  subareaComputacaoId: number;
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
        console.error("Erro ao buscar TCC");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Erro ao buscar TCC:", error);
      setIsLoading(false);
    }
  };

  const fetchOptions = async () => {
    try {
      const cursosRes = await fetch("/api/tcc/cursos");
      const orientadoresRes = await fetch("/api/tcc/orientadores");
      const subareasRes = await fetch("/api/tcc/subareas");

      if (cursosRes.ok && orientadoresRes.ok && subareasRes.ok) {
        const cursosData = await cursosRes.json();
        const orientadoresData = await orientadoresRes.json();
        const subareasData = await subareasRes.json();
        setCursos(cursosData);
        setOrientadores(orientadoresData);
        setSubareas(subareasData);
      } else {
        setError("Erro ao carregar cursos, orientadores ou subáreas.");
      }
    } catch (err) {
      setError("Erro ao carregar opções.");
    }
  };

  const handleUpdate = async () => {
    if (!tcc) return;

    try {
      const response = await fetch(`/api/tcc/${tcc.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tcc),
      });

      if (response.ok) {
        setSuccess("TCC atualizado com sucesso!");
        setError("");
        setTimeout(() => {
          router.push("/admin");
        }, 2000);
      } else {
        setError("Erro ao atualizar TCC");
      }
    } catch (error) {
      setError("Erro ao atualizar TCC:");
    }
  };

  const handleInputChange = (field: keyof TCC, value: string | number | boolean) => {
    setTcc((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (!tcc) {
    return <p>TCC não encontrado</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10 mb-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Editar TCC</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form className="space-y-4">
        <input
          type="text"
          value={tcc.titulo}
          onChange={(e) => handleInputChange("titulo", e.target.value)}
          placeholder="Título"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          value={tcc.subareaComputacaoId}
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

        <h3 className="text-lg font-semibold mt-6">Características do TCC</h3>
        <input
          type="text"
          value={tcc.objetoEstudo}
          onChange={(e) => handleInputChange("objetoEstudo", e.target.value)}
          placeholder="Objeto de Estudo"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={tcc.usoConhecimento}
          onChange={(e) => handleInputChange("usoConhecimento", e.target.value)}
          placeholder="Uso do Conhecimento"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={tcc.objetivoEstudo}
          onChange={(e) => handleInputChange("objetivoEstudo", e.target.value)}
          placeholder="Objetivo do Estudo"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={tcc.principalAreaConhecimento}
          onChange={(e) => handleInputChange("principalAreaConhecimento", e.target.value)}
          placeholder="Área de Conhecimento"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label className="inline-flex items-center mt-4">
          <input
            type="checkbox"
            checked={tcc.coletaSerhumano}
            onChange={() => handleInputChange("coletaSerhumano", !tcc.coletaSerhumano)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2">Coleta com Seres Humanos</span>
        </label>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={handleUpdate}
            className="w-full py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition duration-300"
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
