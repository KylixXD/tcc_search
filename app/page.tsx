import Image from "next/image";
import styles from "./page.module.css";
import './globals.css'
import LoginForm from "./components/auth/loginForm";
import { SearchBar } from "./components/home/search";
import { Navbar } from "./components/home/navbar";
import { Footer } from "./components/home/footer"
import { TccList } from "./components/TCCs/TCCList";


export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar/>
          <SearchBar />
      <Footer/>
  </main>
  );
}
