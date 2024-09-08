import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const {
      objetoEstudo,
      usoConhecimento,
      objetivoEstudo,
      principalAreaConhecimento,
      coletaSerhumano,
      subareaComputacaoId
    } = await request.json();

    // Criação de CaracteristicasTcc no banco de dados
    const caracteristicasTcc = await prisma.caracteristicasTcc.create({
      data: {
        objetoEstudo,
        usoConhecimento,
        objetivoEstudo,
        principalAreaConhecimento,
        coletaSerhumano,
        subareaComputacaoId
      }
    });

    // Retorna a nova característica criada
    return NextResponse.json(caracteristicasTcc, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar CaracteristicasTcc:", error);
    return new NextResponse("Erro ao criar CaracteristicasTcc", { status: 500 });
  }
}
