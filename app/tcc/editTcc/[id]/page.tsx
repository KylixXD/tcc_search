"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

interface TCC {
  id: number;
  titulo: string;
  autor: string;
  curso: { curso: string };
  orientador: { nome: string };
}

export default function EditTccPage() {
  const [tcc, setTcc] = useState<TCC | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const params = useParams(); // Use to get the dynamic id from the route
  const id = Array.isArray(params.id) ? params.id[0] : params.id; // Corrige o tipo de `id`

  useEffect(() => {
    if (id) {
      fetchTcc(id);
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
        alert("TCC atualizado com sucesso!");
        router.push("/admin"); // Redireciona de volta para a página de administração
      } else {
        console.error("Erro ao atualizar TCC");
      }
    } catch (error) {
      console.error("Erro ao atualizar TCC:", error);
    }
  };

  const handleInputChange = (field: keyof TCC, value: string) => {
    setTcc((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (!tcc) {
    return <p>TCC não encontrado</p>;
  }

  return (
    <div>
      <h1>Editar TCC</h1>
      <input
        type="text"
        value={tcc.titulo}
        onChange={(e) => handleInputChange("titulo", e.target.value)}
        placeholder="Título"
      />
      <input
        type="text"
        value={tcc.autor}
        onChange={(e) => handleInputChange("autor", e.target.value)}
        placeholder="Autor"
      />
      <input
        type="text"
        value={tcc.curso.curso}
        onChange={(e) =>
          setTcc((prev) =>
            prev ? { ...prev, curso: { ...prev.curso, curso: e.target.value } } : null
          )
        }
        placeholder="Curso"
      />
      <input
        type="text"
        value={tcc.orientador.nome}
        onChange={(e) =>
          setTcc((prev) =>
            prev ? { ...prev, orientador: { ...prev.orientador, nome: e.target.value } } : null
          )
        }
        placeholder="Orientador"
      />
      <button onClick={handleUpdate}>Salvar</button>
      <button onClick={() => router.push("/admin")}>Cancelar</button>
    </div>
  );
}
