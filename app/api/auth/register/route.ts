import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) { 
    try {
        const body = await request.json();
        const { email, senha, usuario } = body;

        // Verificando se o usuário ou o email já existem
        const existingUser = await prisma.usuarios.findUnique({
            where: { email }
        });

        if (existingUser) {
            return new NextResponse('Email já cadastrado', { status: 400 });
        }

        // Hash da senha
        const hashedPassword = await bcrypt.hash(senha, 10);

        // Criando o usuário no banco de dados
        const newUser = await prisma.usuarios.create({
            data: {
                email,
                senha: hashedPassword,
                usuario,
            },
        });

        return new NextResponse(JSON.stringify({ message: "Usuário criado com sucesso!" }), {
            status: 201,
        });
    } catch (error) {
        console.error(error);
        return new NextResponse('Erro ao criar usuário', { status: 500 });
    }
}
