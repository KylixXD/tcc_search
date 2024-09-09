import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/home/navbar";
import { Footer } from "./components/home/footer"

const roboto = Roboto({ weight: '400', subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TCC Search",
  description: "Testando esse tal de Nextjs",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={roboto.className}>
        <Navbar />
          {children}
        <Footer/>
        </body>
    </html>
  );
}
