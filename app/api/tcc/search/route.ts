import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Ajuste o caminho conforme necessário

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get('searchTerm') || '';
  const filter = searchParams.get('filter') || '';
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const offset = parseInt(searchParams.get('offset') || '0', 10);

  try {
    const filterCondition: any = {}; // Definimos um objeto vazio para armazenar condições de filtro

    // Aplicando o filtro específico se ele estiver presente
    if (filter && searchTerm) {
      filterCondition[filter.toLowerCase()] = {
        contains: searchTerm,
        
      };
    }

    // Lógica de busca para pesquisa geral sem filtros específicos
    const tccs = await prisma.tCCs.findMany({
      where: {
        AND: [
          ...(searchTerm ? [
            {
              OR: [
                { titulo: { contains: searchTerm, } },
                { autor: { contains: searchTerm, } },
                { orientador: { nome: { contains: searchTerm, } } },
                { curso: { curso: { contains: searchTerm, } } },
              ],
            },
          ] : []),
          ...Object.entries(filterCondition).map(([key, value]) => ({
            [key]: value,
          })),
        ],
      },
      include: {
        curso: true,
        orientador: true,
      },
      skip: offset,
      take: limit,
    });

    const totalTccs = await prisma.tCCs.count({
      where: {
        AND: [
          ...(searchTerm ? [
            {
              OR: [
                { titulo: { contains: searchTerm, } },
                { autor: { contains: searchTerm, } },
                { orientador: { nome: { contains: searchTerm, } } },
                { curso: { curso: { contains: searchTerm, } } },
              ],
            },
          ] : []),
          ...Object.entries(filterCondition).map(([key, value]) => ({
            [key]: value,
          })),
        ],
      },
    });

    return NextResponse.json({ tccs, totalTccs });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao buscar TCCs' }, { status: 500 });
  }
}
