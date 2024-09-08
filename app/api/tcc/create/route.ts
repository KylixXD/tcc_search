import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
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

    // Verifica o token JWT e define que o retorno será do tipo JwtPayloadCustom
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayloadCustom;

    // Checa se o usuário é admin
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

    console.log(titulo,
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
      subareaComputacaoId,)

    // Validação básica
    if (!titulo || !autor || !anoDefesa || !resumo || !cursoId || !orientadorId || !subareaComputacaoId) {
      return new NextResponse('Todos os campos são obrigatórios.', { status: 400 });
    }

    // Cria as características do TCC
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

    // Cria o novo TCC com as características associadas
    const novoTCC = await prisma.tCCs.create({
      data: {
        titulo,
        autor,
        anoDefesa,
        resumo,
        link,
        cursoId,
        orientadorId,
        usuarioId: decoded.id, // Pega o id do usuário logado
        caracteristicasTccId: caracteristicasTcc.id,
      },
    });

    return NextResponse.json(novoTCC, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Erro ao criar TCC:', error.message);
      return new NextResponse(`Erro ao criar TCC: ${error.message}`, { status: 500 });
    } else {
      console.error('Erro desconhecido ao criar TCC:', error);
      return new NextResponse('Erro desconhecido ao criar TCC', { status: 500 });
    }
  }
}
