import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Função para buscar o TCC por ID
export async function GET(request: NextRequest, { params }: any) {
  const { id } = params;

  try {
    const tcc = await prisma.tCCs.findUnique({
      where: { id: parseInt(id) },
      include: {
        curso: true,
        orientador: true,
        caracteristicasTcc: {
          include: {
            subareaComputacao: true, // Inclua a subárea para garantir que todos os dados necessários sejam carregados
          },
        },
      },
    });

    if (!tcc) {
      return NextResponse.json({ error: "TCC não encontrado" }, { status: 404 });
    }

    return NextResponse.json(tcc);
  } catch (error) {
    console.error("Erro ao buscar TCC:", error);
    return NextResponse.json({ error: "Erro ao buscar TCC" }, { status: 500 });
  }
}

// Função para atualizar o TCC
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const tccId = parseInt(params.id);
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
    caracteristicasTccId, // Pegando o ID das características do request
  } = await request.json();

  try {
    const updatedTCC = await prisma.tCCs.update({
      where: { id: tccId },
      data: {
        titulo,
        autor,
        anoDefesa,
        resumo,
        link,
        curso: {
          connect: { id: cursoId },
        },
        orientador: {
          connect: { id: orientadorId },
        },
        caracteristicasTcc: {
          update: {
            where: { id: caracteristicasTccId }, // Usando o ID das características para a atualização
            data: {
              objetoEstudo,
              usoConhecimento,
              objetivoEstudo,
              principalAreaConhecimento,
              coletaSerhumano,
              subareaComputacao: {
                connect: { id: subareaComputacaoId },
              },
            },
          },
        },
      },
      include: {
        curso: true,
        orientador: true,
        caracteristicasTcc: true,  
      },
    });

    return NextResponse.json(updatedTCC);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('Erro ao atualizar TCC:', errorMessage);
    return new NextResponse(`Erro ao atualizar TCC: ${errorMessage}`, { status: 500 });
  }
}



// Função para excluir o TCC
export async function DELETE(request: NextRequest, { params }: any) {
  const { id } = params;

  try {
    await prisma.tCCs.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "TCC excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir TCC:", error);
    return NextResponse.json({ error: "Erro ao excluir TCC" }, { status: 500 });
  }
}
