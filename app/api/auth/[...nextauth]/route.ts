import { PrismaClient } from '@prisma/client';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { Usuarios as Usermodel } from '@prisma/client';
import bcrypt from 'bcrypt';

// Criação de uma instância do Prisma Client
const prisma = new PrismaClient();


// Configuração do NextAuth com opções de autenticação
export const authOptions: AuthOptions = {
  pages: {
    signIn: '/auth/login', // Página de login
    newUser: '/auth/register', // Página de registro
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Busca o usuário no banco de dados pelo email
        const user = await prisma.usuarios.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        // Verifica se o usuário existe e se a senha está correta
        if (!user) throw new Error('Email ou senha incorretos');
        if (!credentials?.password) throw new Error('Por favor, forneça sua senha');

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.senha);

        if (!isPasswordCorrect) throw new Error('Email ou senha incorretos');

        // Retorna o usuário sem a senha
        const { senha,id, ...userWithoutPass } = user;
        return { ...userWithoutPass, id: id.toString() };
      },
    }),
  ],
};

// Exporta o handler configurado do NextAuth
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
