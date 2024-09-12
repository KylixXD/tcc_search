import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

// Função para buscar o TCC pelo ID
async function getTccById(id: string) {
  const tcc = await prisma.tCCs.findUnique({
    where: { id: Number(id) },
    include: {
      curso: true,
      orientador: true,
      caracteristicasTcc: true,
    },
  });
  return tcc;
}

export default async function TccDetails({ params }: { params: { id: string } }) {
  const tcc = await getTccById(params.id);

  if (!tcc) {
    return notFound();
  }

  return (
    <div className="min-h-screen max-w-full sm:max-w-3xl mx-auto p-4 sm:p-6 bg-white shadow-md rounded-lg mt-6 sm:mt-10 pb-16 mb-10 text-black">
      <h1 className="text-3xl font-bold mb-1">{tcc.titulo}</h1>
      <p className="text-lg"><strong>Autor:</strong> {tcc.autor}</p>
      <p className="text-lg"><strong>Ano de Defesa:</strong> {tcc.anoDefesa}</p>
      <p className="text-lg"><strong>Resumo:</strong> {tcc.resumo}</p>
      <p className="text-lg"><strong>Curso:</strong> {tcc.curso.curso}</p>
      <p className="text-lg"><strong>Orientador:</strong> {tcc.orientador.nome}</p>
      <p className="text-lg"><strong>Link:</strong> <a href={tcc.link} target="_blank" className="text-blue-500">{tcc.link}</a></p>

      <h2 className="text-2xl font-bold mt-6">Características do TCC</h2>
      {tcc.caracteristicasTcc ? (
        <>
            <p className="text-lg"><strong>Objeto de Estudo:</strong> {tcc.caracteristicasTcc!.objetoEstudo}</p>
            <p className="text-lg"><strong>Uso do Conhecimento:</strong> {tcc.caracteristicasTcc!.usoConhecimento}</p>
            <p className="text-lg"><strong>Objetivo de Estudo:</strong> {tcc.caracteristicasTcc!.objetivoEstudo}</p>
            <p className="text-lg"><strong>Área de Conhecimento:</strong> {tcc.caracteristicasTcc!.principalAreaConhecimento}</p>
            <p className="text-lg"><strong>Coleta com Seres Humanos:</strong> {tcc.caracteristicasTcc!.coletaSerhumano ? 'Sim' : 'Não'}</p>
        </>
      ) : (
        <p>Características do TCC não disponíveis.</p>
      )} 
    </div>
  );
}
