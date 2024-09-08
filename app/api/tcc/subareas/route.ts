import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const subareas  = await prisma.subareaComputacao.findMany();
    return NextResponse.json(subareas , { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar subáreas de computação:', error);
    return new NextResponse('Erro ao buscar subáreas de computação', { status: 500 });
  }
}
