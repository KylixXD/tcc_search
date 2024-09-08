import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const orientadores = await prisma.orientador.findMany();
    return NextResponse.json(orientadores, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar orientadores:', error);
    return new NextResponse('Erro ao buscar orientadores', { status: 500 });
  }
}
