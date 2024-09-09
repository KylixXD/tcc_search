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
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const tccId = parseInt(params.id);
  const { titulo, autor, curso, orientador } = await request.json();

  try {
    const updatedTCC = await prisma.tCCs.update({
      where: { id: tccId },
      data: {
        titulo,
        autor,
        curso: {
          connect: { id: curso.id }, // Conecta ao curso existente pelo ID
        },
        orientador: {
          connect: { id: orientador.id }, // Conecta ao orientador existente pelo ID
        },
      },
      include: {
        curso: true,
        orientador: true,
      },
    });

    return NextResponse.json(updatedTCC);
  } catch (error) {
    console.error("Erro ao atualizar TCC:", error);
    return new NextResponse("Erro ao atualizar TCC", { status: 500 });
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
