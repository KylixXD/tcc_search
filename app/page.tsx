import Image from "next/image";
import styles from "./page.module.css";
import './globals.css'
import LoginForm from "./components/auth/loginForm";
import { SearchBar } from "./components/home/search";
import { Header } from "./components/home/header";
import { Footer } from "./components/home/footer"


export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header/>
      <div className="flex flex-col items-center flex-grow mt-5">
        <h2 className="text-2xl font-semibold mb-4">Busca de TCCs</h2>
        <div className="w-full">
          <SearchBar />
        </div>
      </div>
      <Footer/>
  </main>
  );
}
