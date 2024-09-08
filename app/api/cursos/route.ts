import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const cursos = await prisma.curso.findMany();
    return NextResponse.json(cursos, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar cursos:', error);
    return new NextResponse('Erro ao buscar cursos', { status: 500 });
  }
}
