import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || 'supersecretkey';  // Use uma variável de ambiente para o segredo

export async function POST(request: NextRequest) {
  try {
    const { email, usuario, senha } = await request.json();

    // Verifica se o usuário existe
    const user = await prisma.usuarios.findUnique({
      where: { email, usuario }
    });

    if (!user) {
      return new NextResponse('Usuário não encontrado', { status: 404 });
    }

    // Verifica a senha
    const validPassword = await bcrypt.compare(senha, user.senha);
    if (!validPassword) {
      return new NextResponse('Senha incorreta', { status: 401 });
    }

    // Gera o token JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        usuario: user.usuario, 
        isAdmin: user.isAdmin
      },
      SECRET_KEY,
      { expiresIn: '1h' }  // Token válido por 1 hora
    );

    // Retorna o token para o cliente
    return new NextResponse(JSON.stringify({ token }), {
      status: 200,
    });

  } catch (error) {
    console.error(error);
    return new NextResponse('Erro ao realizar login', { status: 500 });
  }
}
