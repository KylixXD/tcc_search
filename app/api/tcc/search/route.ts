import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Ajuste o caminho conforme necessário

export type Filter = {
  orientador?: { nome: { contains: string } };
  curso?: { curso: { contains: string } };
  titulo?: { contains: string };
  autor?: { contains: string };
  anoDefesa?: number; // Corrigido para tipo numérico
};

// Função para gerar o filtro com base no tipo selecionado
const generateFilterCondition = (filter: string, searchTerm: string): Filter => {
  const filterMap: Filter = {};

  switch (filter) {
    case 'orientador':
      filterMap.orientador = { nome: { contains: searchTerm } };
      break;
    case 'curso':
      filterMap.curso = { curso: { contains: searchTerm } };
      break;
    case 'titulo':
      filterMap.titulo = { contains: searchTerm };
      break;
    case 'autor':
      filterMap.autor = { contains: searchTerm };
      break;
    case 'anoDefesa':
      if (!isNaN(Number(searchTerm))) {
        filterMap.anoDefesa = Number(searchTerm); // Uso direto do valor numérico
      }
      break;
    default:
      break;
  }

  return filterMap;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get('searchTerm') || '';
  const filter = searchParams.get('filter') || '';
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const offset = parseInt(searchParams.get('offset') || '0', 10);

  try {
    // Construção da condição de busca
    const searchConditions = searchTerm && !filter ? {
      OR: [
        { titulo: { contains: searchTerm } },
        { autor: { contains: searchTerm } },
        { orientador: { nome: { contains: searchTerm } } },
        { curso: { curso: { contains: searchTerm } } },
        ...(isNaN(Number(searchTerm)) ? [] : [{ anoDefesa: Number(searchTerm) }]),
      ],
    } : generateFilterCondition(filter, searchTerm);

    // Lógica de busca para pesquisa geral sem filtros específicos
    const tccs = await prisma.tCCs.findMany({
      where: searchConditions,
      include: {
        curso: true,
        orientador: true,
      },
      skip: offset,
      take: limit,
    });

    // Contagem total dos TCCs com as mesmas condições de filtro
    const totalTccs = await prisma.tCCs.count({
      where: searchConditions,
    });

    return NextResponse.json({ tccs, totalTccs });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao buscar TCCs' }, { status: 500 });
  }
}
