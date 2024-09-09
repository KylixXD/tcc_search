import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchTerm, filter, limit, offset } = Object.fromEntries(new URL(request.url).searchParams);

    let whereClause: any = {};

    if (searchTerm) {
      if (filter && ['titulo', 'autor', 'curso', 'orientador'].includes(filter)) {
        // Pesquisa usando o filtro específico
        whereClause = {
          [filter]: {
            contains: searchTerm,
            mode: 'insensitive',  // Ignora caixa alta/baixa
          },
        };
      } else {
        // Pesquisa em múltiplos campos
        whereClause = {
          OR: [
            { titulo: { contains: searchTerm, mode: 'insensitive' } },
            { autor: { contains: searchTerm, mode: 'insensitive' } },
            { curso: { curso: { contains: searchTerm, mode: 'insensitive' } } },
            { orientador: { nome: { contains: searchTerm, mode: 'insensitive' } } },
          ],
        };
      }
    }

    const tccs = await prisma.tCCs.findMany({
      where: whereClause,
      include: {
        curso: true,
        orientador: true,
      },
      skip: offset ? parseInt(offset) : 0,
      take: limit ? parseInt(limit) : 10,
    });

    const totalTccs = await prisma.tCCs.count({ where: whereClause });

    return NextResponse.json({ tccs, totalTccs });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar TCCs' }, { status: 500 });
  }
}

