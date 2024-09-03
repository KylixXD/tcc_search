
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    // Leitura - Retorna um usuário por ID
    const usuario = await prisma.usuarios.findUnique({
      where: { id: Number(id) },
    });
    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } else if (req.method === 'PUT') {
    // Atualização - Atualiza um usuário por ID
    const { email, usuario, senha, isAdmin } = req.body;
    try {
      const usuarioAtualizado = await prisma.usuarios.update({
        where: { id: Number(id) },
        data: { email, usuario, senha, isAdmin },
      });
      res.status(200).json(usuarioAtualizado);
    } catch (error) {
      res.status(500).json({ error: 'Falha ao atualizar o usuário' });
    }
  } else if (req.method === 'DELETE') {
    // Exclusão - Deleta um usuário por ID
    try {
      const usuarioDeletado = await prisma.usuarios.delete({
        where: { id: Number(id) },
      });
      res.status(200).json(usuarioDeletado);
    } catch (error) {
      res.status(500).json({ error: 'Falha ao deletar o usuário' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
