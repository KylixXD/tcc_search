// pages/api/usuarios/index.ts
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
  if (req.method === 'GET') {
    // Leitura - Retorna todos os usuários
    const usuarios = await prisma.usuarios.findMany();
    res.status(200).json(usuarios);
  } else if (req.method === 'POST') {
    // Criação - Cria um novo usuário
    const { email, usuario, senha, isAdmin } = req.body;
    try {
      const novoUsuario = await prisma.usuarios.create({
        data: { email, usuario, senha, isAdmin },
      });
      res.status(201).json(novoUsuario);
    } catch (error) {
      res.status(500).json({ error: 'Falha ao criar o usuário' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
