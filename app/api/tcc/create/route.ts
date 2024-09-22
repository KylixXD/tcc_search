import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Adjust the path if necessary
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'supersecretkey';

// Define o tipo do payload do JWT
interface JwtPayloadCustom extends jwt.JwtPayload {
  id: number;
  isAdmin: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayloadCustom;

    if (!decoded.isAdmin) {
      return new NextResponse('Acesso negado: você não é administrador.', { status: 403 });
    }

    const {
      titulo,
      autor,
      anoDefesa,
      resumo,
      link,
      cursoId,
      orientadorId,
      objetoEstudo,
      usoConhecimento,
      objetivoEstudo,
      principalAreaConhecimento,
      coletaSerhumano,
      subareaComputacaoId,
    } = await request.json();

    if (!titulo || !autor || !anoDefesa || !resumo || !cursoId || !orientadorId || !subareaComputacaoId) {
      return new NextResponse('Todos os campos são obrigatórios.', { status: 400 });
    }

    const caracteristicasTcc = await prisma.caracteristicasTcc.create({
      data: {
        objetoEstudo,
        usoConhecimento,
        objetivoEstudo,
        principalAreaConhecimento,
        coletaSerhumano,
        subareaComputacaoId,
      },
    });

    const novoTCC = await prisma.tCCs.create({
      data: {
        titulo,
        autor,
        anoDefesa,
        resumo,
        link,
        cursoId,
        orientadorId,
        usuarioId: decoded.id,
        caracteristicasTccId: caracteristicasTcc.id,
      },
    });

    return NextResponse.json(novoTCC, { status: 201 });
  } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      console.error('Erro ao criar TCC:', errorMessage);
      return new NextResponse(`Erro ao criar TCC: ${errorMessage}`, { status: 500 });
  }
}
